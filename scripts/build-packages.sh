function clear() {
    rimraf src/index.d.ts
    rimraf src/index.esm.js
    rimraf src/index.umd.js
}

function buildEsm() {
    rollup --config scripts/build/rollup.esm.config.js
}

function buildUmd() {
    rollup --config scripts/build/rollup.umd.config.js
}

function buildDts() {
    rollup --config scripts/build-types/rollup.reactuse.config.js
}

clear

buildEsm
buildUmd
buildDts

