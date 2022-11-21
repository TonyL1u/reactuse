import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import exec from './utils/exec.js';
import doctrine from 'doctrine';
import { Extractor, ExtractorConfig } from '@microsoft/api-extractor';
import MagicString from 'magic-string';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMP_DIR = path.resolve(__dirname, '../temp');
const CURRENT_DIR = process.env.INIT_CWD;
const [_, __, hook] = CURRENT_DIR.match(/src\/(.*)\/(.*)/) ?? [];
if (!hook) {
    console.error('You should run this script at a specific hook directory!\n');
    process.exitCode = 1;
    process.exit();
}
const entry = [`# ${hook}`];

const hookPath = path.join(CURRENT_DIR, 'index.ts');
const apiExtractorJsonPath = path.resolve(__dirname, '../api-extractor.json');
const apiResultJsonPath = path.join(TEMP_DIR, '/reactuse.api.json');

function clearfixTokens(tokens, range) {
    const { startIndex = 0, endIndex = 0 } = range;
    return tokens
        .slice(startIndex, endIndex)
        .map(token => token.text)
        .reduce((prev, cur) => `${prev}${cur}`, '')
        .replace(/\n/g, '')
        .replace(/\|/g, '\\|');
}

function tsc() {
    // add '@ts-nocheck' to skip lib check
    const s = new MagicString(fs.readFileSync(hookPath, 'utf-8'));
    s.prepend('// @ts-nocheck\n');
    fs.writeFileSync(path.join(TEMP_DIR, 'index.ts'), s.toString());
    return exec('tsc temp/index.ts -d --emitDeclarationOnly');
}

function extractApi() {
    // Load and parse the api-extractor.json file
    const extractorConfig = ExtractorConfig.loadFileAndPrepare(apiExtractorJsonPath);

    return new Promise((resolve, reject) => {
        // Invoke API Extractor
        const extractorResult = Extractor.invoke(extractorConfig, {
            // Equivalent to the "--local" command-line parameter
            localBuild: true,

            // Equivalent to the "--verbose" command-line parameter
            showVerboseMessages: true
        });

        if (extractorResult.succeeded) {
            resolve();
        } else {
            reject(`API Extractor completed with ${extractorResult.errorCount} errors and ${extractorResult.warningCount} warnings`);
        }
    });
}

function addUsage(tags) {
    entry.push('## Usage');
    const example = tags.find(tag => tag.title === 'example')?.description ?? '';

    entry.push(example);
}

function addTypeDeclarations() {
    entry.push('## Type Declarations');
    const types = fs.readFileSync(path.join(TEMP_DIR, 'index.d.ts'), 'utf-8').trim();
    // .replace(/import\(.*?\)\.;/g, '')
    // .replace(/import[\s\S]+?from ?["'][\s\S]+?["'];/g, '')
    // .replace(/export {};/g, '');

    entry.push(['```ts', types, '```'].join('\n'));
}

function addParams(member, tags) {
    const fields = ['Name', 'Type', 'Description', 'Optional'];
    entry.push('## Params');
    entry.push(`| ${fields.join(' | ')} |`);
    entry.push(`| ${Array(fields.length).fill(':---:').join(' | ')} |`);

    const { excerptTokens, parameters } = member;
    const lines = parameters.map(({ parameterName, parameterTypeTokenRange, isOptional }) => {
        const name = parameterName;
        const type = clearfixTokens(excerptTokens, parameterTypeTokenRange);
        const description = tags.find(tag => tag.name === name)?.description ?? '';
        const optional = isOptional;
        return `| ${name} | \`${type}\` | ${description} | ${optional} |`;
    });

    entry.push(lines.join('\n'));
}

function addTypeParams(member, tags) {
    const fields = ['Name', 'Constraint', 'Default Type', 'Description'];
    entry.push('## Type Params');
    entry.push(`| ${fields.join(' | ')} |`);
    entry.push(`| ${Array(fields.length).fill(':---:').join(' | ')} |`);

    const { excerptTokens, typeParameters } = member;
    const lines = typeParameters.map(({ typeParameterName, constraintTokenRange, defaultTypeTokenRange }) => {
        const name = typeParameterName;
        const constraint = clearfixTokens(excerptTokens, constraintTokenRange);
        const defaultType = clearfixTokens(excerptTokens, defaultTypeTokenRange);
        const description =
            tags
                .find(({ title, description }) => title === 'typeParam' && description.startsWith(`${name} -`))
                ?.description.split(`${name} -`)
                .slice(1)
                .join('') ?? '';
        return `| ${name} | ${constraint ? `\`<${name} extends ${constraint}>\`` : '-'} | ${defaultType ? `\`${defaultType}\`` : '-'}  | ${description} |`;
    });

    entry.push(lines.join('\n'));
}

// function addReturns(tags) {
//     entry.push('## Returns');

//     const returns = tags.find(tag => tag.title === 'returns').description;
//     entry.push(returns);
// }

function cleanup() {
    return exec('mkdir -p temp && rimraf temp/*');
}

try {
    await cleanup();
    await tsc();
    await extractApi();
    console.log(`API Extractor completed successfully`);
    const apiJson = JSON.parse(fs.readFileSync(apiResultJsonPath, 'utf-8'));
    const member = apiJson.members[0].members.find(({ name }) => name === hook);
    const { description, tags } = doctrine.parse(member.docComment, { unwrap: true });
    entry.push(description);
    addUsage(tags);
    addTypeDeclarations();
    member.parameters?.length > 0 && addParams(member, tags);
    member.typeParameters?.length > 0 && addTypeParams(member, tags);
    // addReturns(tags);
    fs.writeFileSync(path.join(CURRENT_DIR, 'index.md'), entry.join('\n'), () => {});
    cleanup();
} catch (error) {
    console.error(error);
    process.exitCode = 1;
}
