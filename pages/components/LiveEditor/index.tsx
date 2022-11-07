import { useState, useCallback, useRef } from 'react';
import { useLatest, useThrottleFn, watchState, tryOnMounted } from 'reactuse';
import { useRouter } from '@/pages/composables';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { MonacoJsxSyntaxHighlight, getWorker } from 'monaco-jsx-syntax-highlight';
import { parse } from '@babel/parser';
import MagicString from 'magic-string';
import cn from 'classnames';
import Preview from './Preview';
import ToolBox from './Toolbox';
import Console from './Console';
import { useSandbox } from './logic/useSandbox';
import type { Logs } from './Console';

function getProxyPath(proxy: string) {
    return import.meta.env.DEV ? `http://${location.host}/pages/components/LiveEditor/source/proxy/${proxy}-dev-proxy` : `http://${location.host}/live-editor-assets/${proxy}.js`;
}

const imports = {
    reactuse: getProxyPath('reactuse'),
    react: getProxyPath('react'),
    'react-dom/client': getProxyPath('react-dom_client'),
    '@doc-utils': getProxyPath('doc-utils'),
    'lodash-es': getProxyPath('lodash-es')
};

const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    fontSize: 13,
    lineHeight: 20,
    padding: {
        top: 16,
        bottom: 16
    },
    automaticLayout: true,
    folding: false,
    minimap: {
        enabled: false
    },
    lineNumbers: 'off',
    scrollbar: {
        useShadows: false,
        verticalScrollbarSize: 0,
        horizontalScrollbarSize: 0
    },
    lineDecorationsWidth: 16,
    guides: {
        indentation: false
    },
    cursorStyle: 'line-thin',
    overviewRulerBorder: false,
    contextmenu: false,
    renderLineHighlightOnlyWhenFocus: true
};

interface LiveEditorProps {
    code: string;
    path?: string;
    editor?: boolean;
    preview?: boolean;
    toolbox?: boolean;
    console?: boolean;
}

export default function LiveEditor(props: LiveEditorProps) {
    const { code, editor = true, preview = true, toolbox = true, console = false } = props;
    const latestCode = useLatest(decodeURI(code));
    const { onLocationChange } = useRouter();
    const { create, sandbox, proxy, onBeforeCreate, onCreated } = useSandbox({
        imports,
        onConsole(log) {
            if (log.level === 'error') {
                if (log.args[0] instanceof Error) setRuntimeError(log.args[0].message);
                else {
                    let msg = String(log.args[0]);
                    if (msg.includes('%s')) {
                        let index = 0;
                        msg = log.args[0].replace(/%s/g, () => `${log.args[++index]}`);
                    }
                    setRuntimeError(msg);
                }
            } else if (log.level === 'log') {
                if (log.args[0]) {
                    const message = typeof log.args[0] === 'object' ? JSON.stringify(log.args[0]) : String(log.args[0]);
                    collectLogs(logs => [...logs, { timestamp: +new Date(), message }]);
                }
            }
        },
        onError(event) {
            const msg = event.value instanceof Error ? event.value.message : event.value;
            if (!msg) return;
            setRuntimeError(event.value);
        },
        onHandleRejection(event) {
            let error = event.value;
            if (typeof error === 'string') error = { message: error };
            setRuntimeError(`Uncaught (in promise): ${error.message}`);
        }
    });

    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const previewRef = useRef<{ container: HTMLDivElement | null }>();
    const errorDecorator = useRef<string[] | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [runtimeError, setRuntimeError] = useState('');
    const [logs, collectLogs] = useState<Logs>([]);

    const updatePreview = (source: string = editorRef.current?.getValue() ?? '') => {
        try {
            setRuntimeError('');
            setErrorLine(-1);
            const s = new MagicString(source);
            const ast = parse(source, { sourceType: 'module', plugins: ['jsx', 'typescript'] }).program.body;

            // fix react import declaration
            for (const node of ast) {
                if (node.type === 'ImportDeclaration' && node.source.value === 'react') {
                    const { start, end } = node;
                    s.update(start!, end!, '');
                    for (const spec of node.specifiers) {
                        if (spec.type === 'ImportSpecifier') {
                            s.prepend(`const { ${spec.local.name} } = React;\n`);
                        }
                    }
                } else if (node.type === 'ExportDefaultDeclaration' && node.declaration.type === 'ArrowFunctionExpression') {
                    s.update(node.start!, node.start! + 20, 'export default function Module() ');
                }
            }
            s.prepend(`import React from 'react';\n`);
            proxy.current?.eval([s.toString()]);
        } catch (e: any) {
            setErrorLine(e?.loc?.line ?? -1);
            setRuntimeError(`SyntaxError: ${e.message}`);
        }
    };

    const updatePreviewWithThrottle = useThrottleFn(updatePreview, 1000);

    const handleEditorDidMount = useCallback((editor: monaco.editor.IStandaloneCodeEditor) => {
        editorRef.current = editor;
        const monacoJsxSyntaxHighlight = new MonacoJsxSyntaxHighlight(getWorker(), monaco);
        const { highlighter, dispose } = monacoJsxSyntaxHighlight.highlighterBuilder({ editor });
        // init highlight
        highlighter();

        editor.onDidChangeModelContent(() => {
            // content change, highlight
            highlighter();
        });

        return dispose;
    }, []);

    const handleEditorContentChange = (value: string = '') => {
        updatePreviewWithThrottle(value);
    };

    const setErrorLine = (line: number) => {
        if (errorDecorator.current) {
            editorRef.current?.removeDecorations(errorDecorator.current);
            errorDecorator.current = void 0;
        }

        if (line > -1) {
            errorDecorator.current = editorRef.current?.deltaDecorations(
                [],
                [
                    {
                        range: new monaco.Range(line, 1, line, 1),
                        options: {
                            isWholeLine: true,
                            className: 'error-line',
                            linesDecorationsClassName: 'error-line-decorations'
                        }
                    }
                ]
            );
        }
    };

    const resetPreview = () => {
        if (loading) return;

        create();
        clearConsole();
        previewRef.current?.container?.appendChild(sandbox.current!);
        editorRef.current?.revealPositionInCenter({ lineNumber: 1, column: 1 });
    };

    const clearConsole = () => {
        collectLogs(() => []);
    };

    watchState(code, () => {
        !editor && updatePreview(decodeURI(code));
    });

    onLocationChange('pathname', () => {
        editorRef.current?.revealPositionInCenter({ lineNumber: 1, column: 1 });
        updatePreviewWithThrottle.flush();
        clearConsole();
    });

    onBeforeCreate(() => {
        setLoading(true);
        sandbox.current && previewRef.current?.container?.removeChild(sandbox.current);
    });

    onCreated(() => {
        updatePreview(latestCode.current);
        setLoading(false);
    });

    tryOnMounted(() => {
        sandbox.current && previewRef.current?.container?.appendChild(sandbox.current);
    });

    return (
        <div className={cn('live-demo-container', 'tw-rounded tw-flex tw-flex-col tw-relative', { 'with-preview': preview, 'with-editor': editor, 'with-toolbox': toolbox, 'with-console': console })}>
            {toolbox && <ToolBox code={decodeURI(code)} editor={editorRef} reset={resetPreview} />}
            <div className="main tw-h-80 tw-flex">
                {preview && <Preview ref={previewRef} loading={loading} runtimeError={runtimeError} run={updatePreviewWithThrottle} />}
                {editor && (
                    <Editor
                        className="editor-container"
                        height="100%"
                        width={preview ? '50%' : '100%'}
                        options={editorOptions}
                        defaultLanguage="typescript"
                        theme="vitesse-light"
                        value={decodeURI(code)}
                        path="file:///index.tsx"
                        onMount={handleEditorDidMount}
                        onChange={handleEditorContentChange}
                    />
                )}
            </div>
            {console && <Console logs={logs} clear={clearConsole} />}
            {preview && loading && <div className="tw-absolute tw-top-0 tw-right-0 tw-left-0 tw-bottom-0 tw-select-none"></div>}
        </div>
    );
}
