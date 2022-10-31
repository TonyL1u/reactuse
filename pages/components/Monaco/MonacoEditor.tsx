import { useCallback } from 'react';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { MonacoJsxSyntaxHighlight, getWorker } from 'monaco-jsx-syntax-highlight';
import '../../styles/monaco-jsx-highlight.scss';
import Preview from './Preview';
import type { PropsWithChildren } from 'react';

// const code = `
// import { useMouse } from 'reactuse';

// export default () => {
//     const { x, y, sourceType } = useMouse();

//     return (
//         <>
//             <div>x: {x}</div>
//             <div>y: {y}</div>
//             <div>sourceType: {sourceType}</div>
//         </>
//     );
// };
// `.trim();

const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    fontSize: 14,
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
    const { code, children } = props;
    const handleEditorDidMount = useCallback(
        (editor: monaco.editor.IStandaloneCodeEditor) => {
            editor.setValue(code);
            const monacoJsxSyntaxHighlight = new MonacoJsxSyntaxHighlight(getWorker(), monaco);
            const { highlighter, dispose } = monacoJsxSyntaxHighlight.highlighterBuilder({ editor });
            // init highlight
            highlighter();

            const decorator = editor.deltaDecorations(
                [],
                [
                    {
                        range: new monaco.Range(4, 1, 4, 1),
                        options: {
                            isWholeLine: true,
                            className: 'highlight-line'
                        }
                    }
                ]
            );

            editor.onDidChangeModelContent(() => {
                // content change, highlight
                highlighter();
                editor.removeDecorations(decorator);
                console.log(editor.getValue());
            });

            return dispose;
        },
        [code]
    );

    return (
        <div className="editor-container tw-rounded tw-shadow-lg tw-flex">
            <Editor className="editor" height="300px" width="calc(50% - 8px)" defaultLanguage="typescript" theme="vitesse-light" value={code} path={'file:///index.tsx'} onMount={handleEditorDidMount} options={editorOptions} />
            {/* {children} */}
            <Preview />
        </div>
    );
}
