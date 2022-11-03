import basicConfig, { file } from './rollup.config.js';
import esbuild from 'rollup-plugin-esbuild';

export default {
    ...basicConfig,
    plugins: [esbuild()],
    output: {
        name: 'ReactUse',
        file: file('iife.js'),
        format: 'iife',
        extend: true,
        globals: {
            react: 'React',
            'react-router-dom': 'reactRouterDom'
        }
    }
};
