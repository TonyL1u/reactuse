import { useMemo } from 'react';
import { useTitle } from 'reactuse';
import { useNavigate } from 'react-router-dom';
import { useRouter } from './composables';
import cn from 'classnames';
import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
// workers
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
// editor theme
import VitesseLight from 'theme-vitesse/themes/vitesse-light.json';
// custom types
import ReactTypes from '../node_modules/@types/react/index.d.ts?raw';
import LodashEsTypes from '../node_modules/@types/lodash-es/index.d.ts?raw';
import ReactUseTypes from './components/LiveEditor/extra-lib/reactuse.d.ts?raw';
import DocUtilsTypes from './components/LiveEditor/extra-lib/doc-utils.d.ts?raw';
import ClassnamesTypes from '../node_modules/classnames/index.d.ts?raw';
// view
import RouterLink from './routers/RouterLink';
import RouterView from './routers/RouterView';
import RouterPager from './routers/RouterPager';
import reactLogo from './assets/react.svg';
// styles
import './styles/App.scss';
import './styles/doc-demo-widget.scss';
import './styles/monaco-jsx-highlight.scss';

window.MonacoEnvironment = {
    getWorker(_, label) {
        if (label === 'json') {
            return new jsonWorker();
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return new cssWorker();
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return new htmlWorker();
        }
        if (label === 'typescript' || label === 'javascript') {
            return new tsWorker();
        }
        return new editorWorker();
    }
};

loader.config({ monaco });
loader.init().then(monaco => {
    // do conditional chaining
    // @ts-ignore
    monaco.editor.defineTheme('vitesse-light', VitesseLight);

    monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

    // validation settings
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false
    });

    // compiler options
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        strict: true,
        noUnusedLocals: false,
        noUnusedParameters: false,
        allowUnreachableCode: true,
        allowUnusedLabels: true,
        target: monaco.languages.typescript.ScriptTarget.ESNext,
        allowNonTsExtensions: true,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        module: monaco.languages.typescript.ModuleKind.CommonJS,
        noEmit: true,
        jsx: monaco.languages.typescript.JsxEmit.Preserve,
        esModuleInterop: true,
        typeRoots: ['node_modules/@types']
    });

    // add extra libs
    monaco.languages.typescript.typescriptDefaults.addExtraLib(`declare module 'react' {${ReactTypes}}`, 'ts:react');
    monaco.languages.typescript.typescriptDefaults.addExtraLib(`declare module 'reactuse' {${ReactUseTypes}}`, 'ts:reactuse');
    monaco.languages.typescript.typescriptDefaults.addExtraLib(`declare module 'lodash-es' {${LodashEsTypes}}`, 'ts:lodash-es');
    monaco.languages.typescript.typescriptDefaults.addExtraLib(`declare module '@doc-utils' {${DocUtilsTypes}}`, 'ts:doc-utils');
    monaco.languages.typescript.typescriptDefaults.addExtraLib(`declare module 'classnames' {${ClassnamesTypes}}`, 'ts:classnames');

    // or make sure that it exists by other ways
    console.log('here is the monaco instance:', monaco);
});

function App() {
    const { onLocationChange, pathname } = useRouter();
    const { setTitle } = useTitle();
    const navigate = useNavigate();
    const isHomePage = useMemo(() => pathname === '/', [pathname]);

    onLocationChange(
        'pathname',
        ({ pathname }) => {
            if (isHomePage) {
                setTitle('ReactUse')
            } else {
                setTitle(`${pathname.slice(1)} | ReactUse`);
            }
        },
        { immediately: true }
    );

    return (
        <div className={cn({ home: isHomePage }, 'tw-flex tw-flex-col tw-w-full')}>
            <header className="doc-header tw-h-[55px] tw-min-h-[55px] tw-flex tw-items-center tw-justify-between tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-50 " style={{ borderBottom: '1px solid #f0f0f0' }}>
                <div className="badge tw-text-2xl tw-font-semibold tw-cursor-pointer tw-pl-16 tw-h-full tw-w-[300px] tw-box-border tw-flex tw-items-center" onClick={() => navigate('/')}>
                    ReactUse
                    <img src={reactLogo} className="logo react tw-ml-2" alt="React logo" />
                </div>
            </header>
            {!isHomePage && (
                <aside className="doc-aside tw-w-[300px] tw-box-border tw-fixed tw-top-0 tw-bottom-0 tw-left-0 tw-pt-14 tw-pl-16 tw-overflow-scroll" style={{ borderRight: '1px solid #f0f0f0' }}>
                    <RouterLink />
                </aside>
            )}
            <main className="doc-content tw-flex-1 tw-flex tw-flex-col tw-pt-14" style={{ paddingLeft: isHomePage ? '0px' : '300px' }}>
                <RouterView />
                {!isHomePage && <RouterPager />}
            </main>
        </div>
    );
}

export default App;
