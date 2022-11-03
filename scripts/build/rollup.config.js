const file = type => `src/index.${type}`;

export { file };

export default {
    input: 'src/index.ts',
    external: ['react', 'react-dom', 'react-router-dom']
};
