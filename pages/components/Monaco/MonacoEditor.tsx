import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'reactuse';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { MonacoJsxSyntaxHighlight, getWorker } from 'monaco-jsx-syntax-highlight';
import Preview from './Preview';
import ToolBox from './Toolbox';
import { EditorContext } from './context';
import '../../styles/monaco-jsx-highlight.scss';
import type { PropsWithChildren } from 'react';

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

export default function MonacoEditor(props: { code: string } & PropsWithChildren) {
    const { code } = props;
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const errorDecorator = useRef<string[] | undefined>(undefined);
    const [previewCode, updatePreviewCode] = useState(code);
    const [loading, setLoading] = useState(true);
    const { onLocationChange } = useRouter();

    const handleEditorDidMount = useCallback(
        (editor: monaco.editor.IStandaloneCodeEditor) => {
            editor.setValue(code);
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
        },
        [code]
    );

    const handleEditorContentChange = (value?: string) => {
        updatePreviewCode(value ?? '');
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

    onLocationChange('pathname', () => {
        editorRef.current?.revealPositionInCenter({ lineNumber: 1, column: 1 });
    });

    return (
        <EditorContext.Provider value={{ initialCode: code, editor: editorRef }}>
            <div className="live-demo-container tw-rounded tw-flex tw-relative tw-pt-8">
                <ToolBox />
                <Preview code={previewCode} loading={loading} setLoading={setLoading} setErrorLine={setErrorLine} />
                <Editor
                    className="editor-container"
                    height="300px"
                    width="50%"
                    options={editorOptions}
                    defaultLanguage="typescript"
                    theme="vitesse-light"
                    value={code}
                    path={'file:///index.tsx'}
                    onMount={handleEditorDidMount}
                    onChange={handleEditorContentChange}
                />
                {loading && <div className="tw-absolute tw-top-0 tw-right-0 tw-left-0 tw-bottom-0 tw-select-none"></div>}
            </div>
        </EditorContext.Provider>
    );
}
