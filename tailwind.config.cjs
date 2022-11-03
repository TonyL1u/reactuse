/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    prefix: 'tw-',
    content: ['./index.html', './pages/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {}
    },
    plugins: [],
    corePlugins: {
        preflight: false
    }
};
