import dts from 'rollup-plugin-dts';

export default {
    input: 'pages/utils/index.ts',
    plugins: [dts()],
    output: {
        file: 'pages/components/LiveEditor/extra-lib-types/doc-utils.d.ts',
        format: 'es'
    }
};
