function buildMjs() {
    rollup --config scripts/build/rollup.mjs.config.js
}

function buildCjs() {
    rollup --config scripts/build/rollup.cjs.config.js
}

function buildIife() {
    rollup --config scripts/build/rollup.iife.config.js
}


function buildDts() {
    rollup --config scripts/build/rollup.dts.config.js
}

buildMjs
buildCjs
buildIife
buildDts

