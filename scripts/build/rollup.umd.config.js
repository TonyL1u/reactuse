import basicConfig, { file } from './rollup.config.js';

export default {
    ...basicConfig,
    output: {
        name: 'reactuse',
        file: file('umd.js'),
        format: 'umd',
        globals: {
            react: 'React',
            'lodash-es': '_'
        }
    }
};
