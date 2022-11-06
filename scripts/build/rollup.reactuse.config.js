import basicConfig from './rollup.config.js';

export default {
    ...basicConfig,
    input: 'src/index.ts',
    output: {
        file: 'static/live-editor-assets/reactuse.js',
        format: 'esm',
        sourcemap: true
    }
};
