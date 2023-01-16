import * as react from 'react';

declare function stringify(data: Record<string, any>): string;

declare const LogoReact: react.NamedExoticComponent<react.SVGProps<SVGSVGElement>>;

type Merge<F extends object, S extends object> = {
    [P in keyof F | keyof S]: P extends keyof S ? S[P] : P extends keyof F ? F[P] : never;
};

export { LogoReact, Merge, stringify };
