/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePluginMarkdown } from './scripts/vite-plugin';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), VitePluginMarkdown()],
    resolve: {
        alias: {
            reactuse: path.resolve(__dirname, 'src'),
            '@pages': path.resolve(__dirname, 'pages')
        }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        restoreMocks: true
    }
});
