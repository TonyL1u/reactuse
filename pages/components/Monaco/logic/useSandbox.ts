import { useRef } from 'react';
import { tryOnMounted } from 'reactuse';
import { PreviewProxy } from './PreviewProxy';
import type { RefObject } from 'react';

interface SandboxConfig {
    container?: RefObject<HTMLElement>;
    srcdoc: string;
    onHandleRejection: () => void;
    onError: () => void;
    onConsole: () => void;
}

export function useSandbox(config: SandboxConfig) {
    const { container, srcdoc } = config;
    const sandbox = useRef<HTMLIFrameElement>();
    const proxy = useRef<PreviewProxy>();

    const destroy = () => {
        proxy.current?.destroy();
    };

    const create = () => {
        sandbox.current = document.createElement('iframe');
        sandbox.current.setAttribute('sandbox.current', ['allow-forms', 'allow-modals', 'allow-pointer-lock', 'allow-popups', 'allow-same-origin', 'allow-scripts', 'allow-top-navigation-by-user-activation'].join(' '));
        sandbox.current.className = 'tw-rounded-lg tw-shadow tw-sticky tw-top-14 tw-bg-white tw-overflow-auto tw-flex-1 tw-border-none';
        sandbox.current.srcdoc = srcdoc;
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
    };

    tryOnMounted(() => {
        create();
        container?.current?.appendChild(sandbox.current!);
    });

    tryOnMounted(() => {
        destroy();
        container?.current?.removeChild(sandbox.current!);
    });

    return { create, destroy, sandbox: sandbox.current };
}
