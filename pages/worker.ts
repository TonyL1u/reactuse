import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import VitesseLight from 'theme-vitesse/themes/vitesse-light.json';
import ReactTypes from '../node_modules/@types/react/index.d.ts?raw';
import LodashEsTypes from '../node_modules/@types/lodash-es/index.d.ts?raw';
import ReactUseTypes from '../src/index.d.ts?raw';

const UtilTypes = `export declare function stringify(data: Record<string, any>): string;`;

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
    // monaco.languages.typescript.typescriptDefaults.addExtraLib(`declare module 'react' {}`, 'file:///node_modules/@types/react/index.d.ts');
    monaco.languages.typescript.typescriptDefaults.addExtraLib(`declare module 'react' {${ReactTypes}}`, 'ts:react');
    monaco.languages.typescript.typescriptDefaults.addExtraLib(`declare module 'reactuse' {${ReactUseTypes}}`, 'ts:reactuse');
    monaco.languages.typescript.typescriptDefaults.addExtraLib(`declare module 'lodash-es' {${LodashEsTypes}}`, 'ts:lodash-es');
    monaco.languages.typescript.typescriptDefaults.addExtraLib(`declare module '@doc-utils' {${UtilTypes}}`, 'ts:doc-utils');

    // or make sure that it exists by other ways
    console.log('here is the monaco instance:', monaco);
});
