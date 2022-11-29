import gulp from 'gulp';
import clean from 'gulp-clean';
import rename from 'gulp-rename';
import prettier from 'gulp-prettier';
import fs from 'fs';
import fg from 'fast-glob';
import doctrine from 'doctrine';
import { Extractor, ExtractorConfig } from '@microsoft/api-extractor';
import { rollup } from 'rollup';
import dts from 'rollup-plugin-dts';
import through from 'through2';

const { series, src, dest, parallel } = gulp;
const ignoreTasks = ['browser/useEventListener', 'browser/useTitle', 'sensor/useKeyStroke'];

// task
function Cleanup() {
    fs.mkdirSync('temp', { recursive: true });
    return src('temp/*', { read: false }).pipe(clean({ force: true }));
}

async function BuildDts() {
    const bundle = await rollup({ input: 'src/index.ts', plugins: [dts()] });
    await bundle.write({ file: 'temp/index.d.ts', format: 'es' });
}

function ExtractApi() {
    // Load and parse the api-extractor.json file
    const extractorConfig = ExtractorConfig.loadFileAndPrepare('./api-extractor.json');

    return new Promise((resolve, reject) => {
        // Invoke API Extractor
        const extractorResult = Extractor.invoke(extractorConfig, {
            // Equivalent to the "--local" command-line parameter
            localBuild: true,

            // Equivalent to the "--verbose" command-line parameter
            showVerboseMessages: true
        });

        if (extractorResult.succeeded) {
            resolve(void 0);
        } else {
            reject(`API Extractor completed with ${extractorResult.errorCount} errors and ${extractorResult.warningCount} warnings`);
        }
    });
}

async function createParallelTasks() {
    const taskIds = await getTaskIds();

    function createTask(hook) {
        function task() {
            return src('temp/reactuse.api.json')
                .pipe(dispatch(hook))
                .pipe(generate())
                .pipe(prettier({ parser: 'markdown' }))
                .pipe(rename('index.md'))
                .pipe(dest(`src/${hook}`))
                .on('error', console.log);
        }

        // rename task
        Object.defineProperty(task, 'name', { writable: true });
        task.name = hook;

        return task;
    }

    return parallel(taskIds.filter(id => ignoreTasks.indexOf(id) === -1).map(id => createTask(id)));
}

export default series(Cleanup, BuildDts, ExtractApi, await createParallelTasks());
// export default series(await createParallelTasks());

// helper
function createGulpPlugin(executor) {
    return through.obj(function (file, encoding, cb) {
        const next = executor(file.contents.toString(), encoding, cb);

        // rewrite
        if (next) {
            file.contents = Buffer.from(typeof next === 'string' ? next : JSON.stringify(next));
        }
        this.push(file);
        cb();
    });
}

function mergeToken(tokens, range = {}) {
    const { startIndex = 0, endIndex = tokens.length } = range;

    return tokens
        .slice(startIndex, endIndex)
        .map(token => token.text)
        .reduce((prev, cur) => `${prev}${cur}`, '');
}

function analysisReference(tokens, reference, revealContent = []) {
    const referenceTokens = tokens.filter(({ kind }) => kind === 'Reference');
    for (const { text } of referenceTokens) {
        const ref = reference.find(({ name }) => name === text);

        if (ref) {
            const { kind, excerptTokens, members } = ref;
            switch (kind) {
                case 'Interface':
                    const propertyContent = members.map(({ docComment, excerptTokens }) => `${docComment.replace('@defaultValue\n *\n *', '@defaultValue')}${mergeToken(excerptTokens)}`).join('\n');
                    revealContent.push(`${mergeToken(excerptTokens)}{ ${propertyContent} }`);
                    members.forEach(({ excerptTokens }) => analysisReference(excerptTokens, reference, revealContent));
                    break;
                case 'TypeAlias':
                case 'Function':
                    revealContent.push(mergeToken(excerptTokens));
                    analysisReference(excerptTokens, reference, revealContent);
                    break;
                default:
            }
        }
    }

    return revealContent;
}

function fixEndSlash(str) {
    return str.endsWith('/') ? str.slice(0, -1) : str;
}

function fixCommentEscape(str) {
    return str.replace(/\\\/\*/g, '/*').replace(/\*\\\//g, '*/');
}

async function getTaskIds() {
    const [_, category, hook] = process.env.INIT_CWD.match(/src\/(.*)\/(.*)/) ?? [];
    if (category && hook) return [`${category}/${hook}`];

    const entries = await fg('src/**/**/index.ts');
    return entries
        .map(entry => {
            const [_, category, hook] = entry.match(/src\/(.*)\/(.*)\//) ?? [];
            return category && hook ? `${category}/${hook}` : '';
        })
        .filter(Boolean);
}

// plugin
function dispatch(hook) {
    const [_, __, hookName] = hook.match(/(.*)\/(.*)/);

    return createGulpPlugin(data => {
        const apiJson = JSON.parse(data);
        const meta = apiJson.members[0].members.find(({ name, kind }) => name === hookName && kind === 'Function');
        const reference = apiJson.members[0].members.filter(({ kind }) => kind === 'TypeAlias' || kind === 'Interface');

        return { meta, reference };
    });
}

function generate() {
    return createGulpPlugin(data => {
        const { meta, reference } = JSON.parse(data);

        if (meta) {
            const flow = new MarkdownFlow(meta);
            flow.addUsage().addTypeDeclarations(reference).addParams().addTypeParams();
            return flow.renderText();
        }

        return `You may not export this hook! Please check your _**index.ts**_ file.`;
    });
}

class MarkdownFlow {
    meta = {};
    description = '';
    commentTags = [];
    entry = [];

    constructor(meta) {
        const { description, tags } = doctrine.parse(meta.docComment, { unwrap: true });
        this.meta = meta;
        this.description = fixEndSlash(description);
        this.commentTags = tags;
        this.entry.push(`# ${this.meta.name}`, this.description);
    }

    addUsage() {
        this.entry.push('## Usage');
        const example = this.commentTags.find(tag => tag.title === 'example')?.description ?? '';

        this.entry.push(fixCommentEscape(fixEndSlash(example)));
        return this;
    }

    addTypeDeclarations(reference) {
        this.entry.push('## Type Declarations');

        const revealContent = new Set(analysisReference(this.meta.excerptTokens, reference));
        this.entry.push('```ts', ...revealContent, mergeToken(this.meta.excerptTokens), '```');
        return this;
    }

    addParams() {
        const { excerptTokens, parameters = [] } = this.meta;
        if (parameters.length === 0) return this;

        const fields = ['Name', 'Type', 'Description', 'Optional'];
        this.entry.push('## Params', `| ${fields.join(' | ')} |`, `| ${Array(fields.length).fill(':---:').join(' | ')} |`);

        const lines = parameters.map(({ parameterName, parameterTypeTokenRange, isOptional }) => {
            const name = parameterName;
            const type = mergeToken(excerptTokens, parameterTypeTokenRange).replace(/\n/g, '').replace(/\|/g, '\\|');
            const description = this.commentTags.find(tag => tag.name === name)?.description ?? '';
            const optional = isOptional;
            return `| ${name} | \`${type}\` | ${description} | ${optional} |`;
        });

        this.entry.push(...lines);
        return this;
    }

    addTypeParams() {
        const { excerptTokens, typeParameters = [] } = this.meta;
        if (typeParameters.length === 0) return this;

        const fields = ['Name', 'Constraint', 'Default Type', 'Description'];
        this.entry.push('## Type Params', `| ${fields.join(' | ')} |`, `| ${Array(fields.length).fill(':---:').join(' | ')} |`);

        const lines = typeParameters.map(({ typeParameterName, constraintTokenRange, defaultTypeTokenRange }) => {
            const name = typeParameterName;
            const constraint = mergeToken(excerptTokens, constraintTokenRange).replace(/\n/g, '').replace(/\|/g, '\\|');
            const defaultType = mergeToken(excerptTokens, defaultTypeTokenRange).replace(/\n/g, '').replace(/\|/g, '\\|');
            const description =
                this.commentTags
                    .find(({ title, description }) => title === 'typeParam' && description.startsWith(`${name} -`))
                    ?.description.split(`${name} -`)
                    .slice(1)
                    .join('') ?? '';
            return `| ${name} | ${constraint ? `\`<${name} extends ${constraint}>\`` : '-'} | ${defaultType ? `\`${defaultType}\`` : '-'}  | ${description} |`;
        });

        this.entry.push(...lines);
        return this;
    }

    renderText() {
        return this.entry.join('\n');
    }
}
