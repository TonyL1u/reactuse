import type { ReactNode } from 'react';

export type Category = 'browser' | 'elements' | 'router' | 'sensor' | 'shared' | 'state' | 'utilities';
interface DynamicImportData {
    key: string;
    category: Category;
    name: string;
    element: ReactNode;
}
const Demos = import.meta.glob<{ default: () => ReactNode }>('../../src/**/**/index.md', { eager: true });

export function create<T>(callback: (data: DynamicImportData) => T) {
    return Object.entries(Demos).map(([key, module]) => {
        const [_, category, name] = key.match(/\/src\/(.*)\/(.*)\/index.md/)!;
        return callback({ key, category: category as Category, name, element: module.default() });
    });
}

export function createCategory<T extends Category, E>(category: T, callback: (data: DynamicImportData) => E) {}
