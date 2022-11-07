rollup --config scripts/build/rollup.reactuse.config.js
rollup --config scripts/build/rollup.doc-utils.config.js
node scripts/fix-react-imports.js
cp pages/components/LiveEditor/source/css/doc-demo-widget.css static/live-editor-assets
cp -r static/* docs