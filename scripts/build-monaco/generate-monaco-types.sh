rimraf pages/components/LiveEditor/extra-lib/*
rimraf src/index.d.ts
rollup --config scripts/build-types/rollup.reactuse.config.js
rollup --config scripts/build-types/rollup.doc-utils.config.js
cp -r src/index.d.ts pages/components/LiveEditor/extra-lib/reactuse.d.ts
rimraf src/index.d.ts