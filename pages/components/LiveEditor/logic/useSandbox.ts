import { useRef } from 'react';
import { tryOnMounted, tryOnUnmounted, useEventHook } from 'reactuse';
import srcdoc from '../source/template.html?raw';

// ReplProxy and srcdoc implementation from Svelte REPL
// MIT License https://github.com/sveltejs/svelte-repl/blob/master/LICENSE
let uid = 1;
class PreviewProxy {
    iframe: HTMLIFrameElement;
    handlers: Record<string, Function>;
    pending_cmds: Map<number, { resolve: (value: unknown) => void; reject: (reason?: any) => void }>;
    handle_event: (e: any) => void;

    constructor(iframe: HTMLIFrameElement, handlers: Record<string, Function>) {
        this.iframe = iframe;
        this.handlers = handlers;

        this.pending_cmds = new Map();

        this.handle_event = e => this.handle_repl_message(e);
        window.addEventListener('message', this.handle_event, false);
    }

    destroy() {
        window.removeEventListener('message', this.handle_event);
    }

    iframe_command(action: string, args: any) {
        return new Promise((resolve, reject) => {
            const cmd_id = uid++;

            this.pending_cmds.set(cmd_id, { resolve, reject });

            this.iframe.contentWindow!.postMessage({ action, cmd_id, args }, '*');
        });
    }

    handle_command_message(cmd_data: any) {
        let action = cmd_data.action;
        let id = cmd_data.cmd_id;
        let handler = this.pending_cmds.get(id);

        if (handler) {
            this.pending_cmds.delete(id);
            if (action === 'cmd_error') {
                let { message, stack } = cmd_data;
                let e = new Error(message);
                e.stack = stack;
                handler.reject(e);
            }

            if (action === 'cmd_ok') {
                handler.resolve(cmd_data.args);
            }
        } else {
            console.error('command not found', id, cmd_data, [...this.pending_cmds.keys()]);
        }
    }

    handle_repl_message(event: any) {
        if (event.source !== this.iframe.contentWindow) return;

        const { action, args } = event.data;

        switch (action) {
            case 'cmd_error':
            case 'cmd_ok':
                return this.handle_command_message(event.data);
            case 'fetch_progress':
                return this.handlers.on_fetch_progress(args.remaining);
            case 'error':
                return this.handlers.on_error(event.data);
            case 'unhandledrejection':
                return this.handlers.on_unhandled_rejection(event.data);
            case 'console':
                return this.handlers.on_console(event.data);
            case 'console_group':
                return this.handlers.on_console_group(event.data);
            case 'console_group_collapsed':
                return this.handlers.on_console_group_collapsed(event.data);
            case 'console_group_end':
                return this.handlers.on_console_group_end(event.data);
        }
    }

    eval(script: string | string[]) {
        return this.iframe_command('eval', { script });
    }

    handle_links() {
        return this.iframe_command('catch_clicks', {});
    }
}

interface SandboxConfig {
    imports?: Record<string, string>;
    onHandleRejection?: (event: any) => void;
    onError?: (event: any) => void;
    onConsole?: (log: any) => void;
}

export function useSandbox(config: SandboxConfig = {}) {
    const { imports = {}, onHandleRejection, onError, onConsole } = config;
    const onCreatedHook = useEventHook();
    const onBeforeCreateHook = useEventHook();
    const onDestroyHook = useEventHook();

    const sandbox = useRef<HTMLIFrameElement>();
    const proxy = useRef<PreviewProxy>();

    const destroy = () => {
        proxy.current?.destroy();
        onDestroyHook.trigger();
    };

    const create = () => {
        console.log('----create');
        onBeforeCreateHook.trigger();
        destroy();
        // create iframe
        sandbox.current = document.createElement('iframe');
        sandbox.current.setAttribute('sandbox', ['allow-forms', 'allow-modals', 'allow-pointer-lock', 'allow-popups', 'allow-same-origin', 'allow-scripts', 'allow-top-navigation-by-user-activation'].join(' '));
        sandbox.current.className = 'tw-rounded-lg tw-shadow tw-bg-white tw-overflow-auto tw-flex-1 tw-border-none';
        sandbox.current.id = 'sandbox_iframe';
        sandbox.current.srcdoc = srcdoc.replace(/<!--IMPORT_MAP-->/, JSON.stringify({ imports }));

        // create message proxy
        proxy.current = new PreviewProxy(sandbox.current, {
            on_fetch_progress: (progress: any) => {
                // pending_imports = progress;
            },
            on_error: (event: any) => {
                onError?.(event);
            },
            on_unhandled_rejection: (event: any) => {
                onHandleRejection?.(event);
            },
            on_console: (log: any) => {
                onConsole?.(log);
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
            onCreatedHook.trigger();
        });
    };

    tryOnMounted(create);

    tryOnUnmounted(destroy);

    return {
        create,
        destroy,
        sandbox,
        proxy,
        onBeforeCreate: onBeforeCreateHook.on,
        onCreated: onCreatedHook.on,
        onDestroy: onDestroyHook.on
    };
}
