import { createContext } from 'react';
import * as monaco from 'monaco-editor';
import type { RefObject } from 'react';

export interface EditorContextProvideValue {
    initialCode: string;
    editor: RefObject<monaco.editor.IStandaloneCodeEditor | null>;
}

export const EditorContext = createContext<EditorContextProvideValue>({ initialCode: '', editor: { current: null } });
