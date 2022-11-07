rollup --config scripts/build/rollup.reactuse.config.js
rollup --config scripts/build/rollup.doc-utils.config.js
node scripts/fix-react-imports.js
cp -r static/* docs