import basicConfig from './rollup.config.js';

export default {
    ...basicConfig,
    input: 'pages/utils/index.ts',
    output: {
        file: 'static/live-editor-assets/doc-utils.js',
        format: 'esm',
        sourcemap: true
    }
};
