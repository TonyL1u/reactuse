

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

BUILD=$1;

if [ $BUILD == 'dts' ]; then
    buildDts
elif [ $BUILD == 'cjs' ]; then
    buildCjs
elif [ $BUILD == 'mjs' ]; then
    buildMjs
elif [ $BUILD == 'iife' ]; then
    buildIife
else
    buildMjs
    buildCjs
    buildIife
    buildDts
fi


