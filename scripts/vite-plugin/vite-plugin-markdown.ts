import MarkdownIt from 'markdown-it';
import MarkdownItHljs from 'markdown-it-highlightjs';
import MarkdownItAnchor from 'markdown-it-anchor';
import babel from '@babel/core';
import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';
import type Token from 'markdown-it/lib/token';
import type Renderer from 'markdown-it/lib/renderer';

const md = new MarkdownIt({ html: true, linkify: true, typographer: true });
const fenceWrap = (render: Renderer.RenderRule) => (tokens: Token[], idx: number, options: MarkdownIt.Options, env: any, self: any) => {
    // const code = lz.compressToEncodedURIComponent(tokens[idx].content);
    return `<div class="language-${tokens[idx].info}">${render.apply(this, [tokens, idx, options, env, self])}</div>`;
};

md.use(MarkdownItHljs).use(MarkdownItAnchor, {
    permalink: MarkdownItAnchor.permalink.headerLink()
});
md.renderer.rules['fence'] = fenceWrap(md.renderer.rules['fence']!);

const fileRegex = /\.(md)$/;

export default (): Plugin => {
    return {
        enforce: 'pre',
        name: 'transform-markdown-file',
        transform(code, id, options?) {
            if (fileRegex.test(id)) {
                const [_, category, name] = id.match(/\/src\/(.*)\/(.*)\/index\.md/);
                return transformMarkdown(code, { category, name });
            }
        }
    };
};

function transformMarkdown(source: string, info: { category: string; name: string }) {
    const { category, name } = info;
    const template = getTemplate(source, path.join('src', category, name, 'demo.tsx'));
    const { code, map } = babel.transformSync(template, {
        babelrc: false,
        ast: true,
        plugins: ['@babel/plugin-transform-react-jsx'],
        sourceMaps: false,
        configFile: false
    });

    return { code, map };
}

function getTemplate(source: string, demoPath: string) {
    const sliceIndex = source.search(/\n## \w/);
    const hasDemo = fs.existsSync(demoPath);
    if (hasDemo) {
        const demo = fs.readFileSync(demoPath, 'utf-8');

        return `
        import React from 'react';
        import Demo from './demo';
        import MdWrapper from '@pages/components/MdWrapper';
        import MonacoEditor from '@pages/components/Monaco/MonacoEditor'
        
        const code = \`${demo}\`.trim();
        const path = \`${''}\`;

        export default () => {
            return  (
                <div className="markdown-body light">
                    <MdWrapper code={\`${encodeURI(md.render(source.slice(0, sliceIndex) + '\n## Demo'))}\`} />
                    <MonacoEditor code={code} path={path} />
                    <MdWrapper code={\`${encodeURI(md.render(source.slice(sliceIndex)))}\`} />
                </div>
            )
        }
        `;
    } else {
        return `
        import React from 'react';
        import MdWrapper from '@pages/components/MdWrapper';
    
        export default () => {
            return  (
                <div className="markdown-body light">
                    <MdWrapper code={\`${encodeURI(md.render(source))}\`} />
                </div>
            )
        }
        `;
    }
}
