import dts from 'rollup-plugin-dts';

export default {
    input: 'pages/utils/index.ts',
    plugins: [dts()],
    output: {
        file: 'pages/components/LiveEditor/extra-lib/doc-utils.d.ts',
        format: 'es'
    }
};
