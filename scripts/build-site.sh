function clear() {
    rimraf dist
}

function build() {
    sh scripts/build-monaco/generate-monaco-types.sh
    tsc && vite build
}

function buildEditorAssests() {
    sh scripts/build-monaco/generate-monaco-assets.sh
}

clear
build
buildEditorAssests
