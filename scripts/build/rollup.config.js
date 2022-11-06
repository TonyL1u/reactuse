import esbuild from 'rollup-plugin-esbuild';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

const babelOptions = {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    exclude: 'node_modules/**',
    babelHelpers: 'bundled'
};

const file = type => `src/index.${type}`;

export { file };

export default {
    input: 'src/index.ts',
    plugins: [esbuild(), resolve(), commonjs({ include: ['node_modules/**', 'node_modules/**/*'] }), babel(babelOptions)],
    external: ['react', 'react-dom', 'lodash-es']
};
