import basicConfig, { file } from './rollup.config.js';
import dts from 'rollup-plugin-dts';

export default {
    ...basicConfig,
    plugins: [dts()],
    output: {
        file: file('d.ts'),
        format: 'es'
    }
};
