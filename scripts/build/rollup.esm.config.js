import basicConfig, { file } from './rollup.config.js';

export default {
    ...basicConfig,
    output: {
        file: file('esm.js'),
        format: 'esm'
    }
};
