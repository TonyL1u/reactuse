import { useRef, useState } from 'react';
import { useLatest, tryOnMounted, tryOnUnmounted, watchState, throttleFilter } from 'reactuse';
import { PreviewProxy } from './logic/PreviewProxy';
import { parse } from '@babel/parser';
import MagicString from 'magic-string';
import srcDoc from './source/template.html?raw';
import './styles/loading-cube.scss';
import type { Dispatch, SetStateAction } from 'react';

function getProxyPath(proxy: string) {
    return import.meta.env.DEV ? `http://${location.host}/pages/components/Monaco/source/proxy/${proxy}-dev-proxy` : '';
}

const importMap = {
    reactuse: getProxyPath('reactuse'),
    react: getProxyPath('react'),
    'react-dom/client': getProxyPath('react-dom-client'),
    '@doc-utils': getProxyPath('doc-utils'),
    'lodash-es': getProxyPath('lodash-es')
};

const LoadingCube = () => {
    return (
        <div className="cube-wrapper">
            <div className="cube">
                <div className="sides">
                    <div className="top" />
                    <div className="right" />
                    <div className="bottom" />
                    <div className="left" />
                    <div className="front" />
                    <div className="back" />
                </div>
            </div>
        </div>
    );
};

const ErrorDisplayPanel = (props: { error: string }) => {
    return (
        <div className="tw-absolute tw-top-6 tw-bottom-6 tw-left-6 tw-right-6 tw-bg-white tw-rounded-lg tw-z-20 tw-border-red-500 tw-border-solid tw-border-2 tw-p-6 tw-overflow-auto">
            <span className="tw-text-red-600 tw-text-2xl">Error</span>
            <div className="tw-mt-3 tw-tracking-wide">{props.error}</div>
        </div>
    );
};

export default function Preview(props: { code: string; loading: boolean; setLoading: Dispatch<SetStateAction<boolean>>; setErrorLine: (line: number) => void }) {
    const { code, loading, setLoading, setErrorLine } = props;
    const [runtimeError, setRuntimeError] = useState('');

    const latestCode = useLatest(code);
    const proxy = useRef<PreviewProxy>();
    const sandbox = useRef<HTMLIFrameElement>();
    const container = useRef<HTMLDivElement>(null);

    const createSandbox = () => {
        setLoading(true);
        if (!container.current) return;

        if (sandbox.current) {
            proxy.current?.destroy();
            container.current.removeChild(sandbox.current);
        }

        sandbox.current = document.createElement('iframe');
        sandbox.current.setAttribute('sandbox.current', ['allow-forms', 'allow-modals', 'allow-pointer-lock', 'allow-popups', 'allow-same-origin', 'allow-scripts', 'allow-top-navigation-by-user-activation'].join(' '));
        sandbox.current.className = 'tw-rounded-lg tw-shadow tw-sticky tw-top-14 tw-bg-white tw-overflow-auto tw-flex-1 tw-border-none';
        sandbox.current.srcdoc = srcDoc.replace(/<!--IMPORT_MAP-->/, JSON.stringify({ imports: importMap }));

        proxy.current = new PreviewProxy(sandbox.current, {
            on_fetch_progress: (progress: any) => {
                // pending_imports = progress;
            },
            on_error: (event: any) => {
                const msg = event.value instanceof Error ? event.value.message : event.value;
                if (!msg) return;
                setRuntimeError(event.value);
            },
            on_unhandled_rejection: (event: any) => {
                let error = event.value;
                if (typeof error === 'string') error = { message: error };
                setRuntimeError(`Uncaught (in promise): ${error.message}`);
            },
            on_console: (log: any) => {
                if (log.level === 'error') {
                    if (log.args[0] instanceof Error) setRuntimeError(log.args[0].message);
                    else {
                        let msg = log.args[0];
                        if (msg.includes('%s')) {
                            let index = 0;
                            msg = log.args[0].replace(/%s/g, () => `${log.args[++index]}`);
                        }
                        setRuntimeError(msg);
                    }
                } else if (log.level === 'log') {
                    console.log(log);
                }
            },
            on_console_group: (action: any) => {
                // group_logs(action.label, false);
            },
            on_console_group_end: () => {
                // ungroup_logs();
            },
            on_console_group_collapsed: (action: any) => {
                // group_logs(action.label, true);
            }
        });

        sandbox.current.addEventListener('load', async () => {
            proxy.current?.handle_links();
            await updatePreview(latestCode.current);
            setLoading(false);
        });

        container.current.appendChild(sandbox.current);
    };

    const updatePreview = async (source: string) => {
        try {
            setRuntimeError('');
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
            setErrorLine(e?.loc.line ?? -1);
            setRuntimeError(`SyntaxError: ${e.message}`);
        }
    };

    watchState(code, updatePreview, { eventFilter: throttleFilter(1000) });

    watchState(runtimeError, err => {
        if (err === '') setErrorLine(-1);
    });

    tryOnMounted(createSandbox);

    tryOnUnmounted(() => {
        proxy.current?.destroy();
    });

    return (
        <>
            {/* <button onClick={createSandbox}>重置</button> */}
            <div ref={container} className="preview-container tw-flex-1 tw-p-6 tw-overflow-auto tw-flex tw-relative">
                {loading && <LoadingCube />}
                {runtimeError && <ErrorDisplayPanel error={String(runtimeError)} />}
            </div>
        </>
    );
}
