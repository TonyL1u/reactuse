import { useRef, useEffect } from 'react';
import { tryOnMounted } from 'reactuse';
import { PreviewProxy } from './logic/PreviewProxy';
import srcDoc from './logic/template.html?raw';

export default () => {
    let sandbox: HTMLIFrameElement;
    let proxy: PreviewProxy;
    let stopUpdateWatcher: any;
    const container = useRef<HTMLDivElement>(null);

    function createSandbox() {
        if (!container.current) return;

        if (sandbox) {
            proxy.destroy();
            if (stopUpdateWatcher) stopUpdateWatcher();
            container.current.removeChild(sandbox);
        }
        sandbox = document.createElement('iframe');
        sandbox.setAttribute('sandbox', ['allow-forms', 'allow-modals', 'allow-pointer-lock', 'allow-popups', 'allow-same-origin', 'allow-scripts', 'allow-top-navigation-by-user-activation'].join(' '));
        let importMap: Record<string, any>;
        try {
            // importMap = JSON.parse(store.importMap || '{}');
        } catch (e: any) {
            // store.errors = [`Syntax error in import-map.json: ${e.message}`];
            return;
        }
        // if (!importMap.imports) importMap.imports = {};

        // importMap.imports.vue = vueRuntimeUrl.value;
        const sandboxSrc = srcDoc;
        sandbox.srcdoc = sandboxSrc;
        container.current.appendChild(sandbox);
        proxy = new PreviewProxy(sandbox, {
            on_fetch_progress: (progress: any) => {
                // pending_imports = progress;
            },
            on_error: (event: any) => {
                const msg = event.value instanceof Error ? event.value.message : event.value;
                if (!msg) return;
                if (msg.includes('Failed to resolve module specifier') || msg.includes('Error resolving module specifier')) {
                    // runtimeError.value = `${msg.replace(/\. Relative references must.*$/, '')}.\nTip: add an "import-map.json" file to specify import paths for dependencies.`;
                } else {
                    // runtimeError.value = event.value;
                }
            },
            on_unhandled_rejection: (event: any) => {
                let error = event.value;
                if (typeof error === 'string') error = { message: error };

                // runtimeError.value = `Uncaught (in promise): ${error.message}`;
            },
            on_console: (log: any) => {
                if (log.level === 'error') {
                    // if (log.args[0] instanceof Error) runtimeError.value = log.args[0].message;
                    // else runtimeError.value = log.args[0];
                } else if (log.level === 'warn') {
                    // if (log.args[0].toString().includes('[Vue warn]')) {
                    //     runtimeWarning.value = log.args
                    //         .join('')
                    //         .replace(/\[Vue warn\]:/, '')
                    //         .trim();
                    // }
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
        sandbox.addEventListener('load', () => {
            proxy.handle_links();
            updatePreview();
            sandbox.contentWindow?.postMessage({ action: 'eval', cmd_id: 1, args: 'console.log(123)' }, '*');
            // stopUpdateWatcher = useEffect(updatePreview);
        });
    }
    function updatePreview() {
        // console.clear()
        // runtimeError.value = null;
        // runtimeWarning.value = null;
        try {
            // const modules = compileModulesForPreview();
            // eslint-disable-next-line no-console
            // console.log(`successfully compiled ${modules.length} modules.`);
            proxy.eval(['console.log(444)']);
            // reset modules
            //         await Promise.all([
            //             // sleep(1000),
            //             await proxy.eval([
            //                 // "window.__modules__ = {};window.__css__ = ''",
            //                 // ...modules,
            //                 // isDark.value ? 'document.querySelector("html").classList.add("dark")' : 'document.querySelector("html").classList.remove("dark")',
            //                 `
            // //   import { createApp as _createApp } from "vue"
            // //   if (window.__app__) {
            // //     window.__app__.unmount()
            // //     document.getElementById('app').innerHTML = ''
            // //   }
            // //   document.getElementById('__sfc-styles').innerHTML = window.__css__
            // //   const app = window.__app__ = _createApp(__modules__["${MAIN_FILE}"].default)
            // //   app.config.errorHandler = e => console.error(e)
            // //   app.mount('#app')`.trim()
            //             ])
            //         ]);
            // emit('renderFinished');
        } catch (e: any) {
            // runtimeError.value = e.message;
        }
    }

    // useEffect(updatePreview);

    tryOnMounted(() => {
        createSandbox();
    });

    return (
        <div className="preview tw-flex-1 tw-ml-4 tw-p-6 tw-overflow-auto tw-flex">
            <div ref={container} className="tw-rounded tw-sticky tw-top-14 tw-shadow-lg tw-bg-white tw-p-4 tw-overflow-auto tw-flex-1">
                {/* {children} */}
                {/* 123 */}
            </div>
        </div>
    );

    // <div className="preview">123</div>;
    // <iframe srcDoc={srcDoc}></iframe>;
};
