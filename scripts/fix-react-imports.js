import fs from 'fs';
import path from 'path';
import MagicString from 'magic-string';

const sourcePath = path.resolve('static', 'live-editor-assets', 'reactuse.js');
const source = fs.readFileSync(sourcePath, 'utf-8');
const importDeclarationIndex = source.split('\n').findIndex(line => line.indexOf(" from 'react'") > -1);
const importDeclaration = source.split('\n')[importDeclarationIndex];
const specifiers = importDeclaration.match(/import (.*) from 'react'/);

const s = new MagicString(source);
s.update(
    importDeclarationIndex,
    importDeclarationIndex + importDeclaration.length,
    `
import React from 'react';
const ${specifiers[1]} = React;
`
);

fs.writeFileSync(sourcePath, s.toString());
