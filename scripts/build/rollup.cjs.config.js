import basicConfig, { file } from './rollup.config.js';
import esbuild from 'rollup-plugin-esbuild';

export default {
    ...basicConfig,
    plugins: [esbuild()],
    output: {
        file: file('cjs'),
        format: 'cjs'
    }
};
