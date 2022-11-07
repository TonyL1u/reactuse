/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePluginMarkdown } from './scripts/vite-plugin';
import path from 'path';

const prefix = 'monaco-editor/esm/vs';
// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: 'docs'
    },
    base: process.env.NODE_ENV === 'production' ? '/reactuse' : '/',
    plugins: [react(), VitePluginMarkdown()],
    resolve: {
        alias: {
            reactuse: path.resolve(__dirname, 'src'),
            '@': path.resolve(__dirname, '.'),
            '@pages': path.resolve(__dirname, 'pages'),
            '@doc-utils': path.resolve(__dirname, 'pages', 'utils')
        }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        restoreMocks: true
    },
    optimizeDeps: {
        include: [`${prefix}/language/css/css.worker`, `${prefix}/language/html/html.worker`, `${prefix}/language/json/json.worker`, `${prefix}/language/typescript/ts.worker`, `${prefix}/editor/editor.worker`]
    }
});
