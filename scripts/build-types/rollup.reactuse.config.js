import dts from 'rollup-plugin-dts';

export default {
    input: 'src/index.ts',
    plugins: [dts()],
    output: {
        file: 'src/index.d.ts',
        format: 'es'
    }
};
