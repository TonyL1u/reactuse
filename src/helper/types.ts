import type { RefObject } from 'react';

export type Merge<F extends object, S extends object> = { [P in keyof F | keyof S]: P extends keyof S ? S[P] : P extends keyof F ? F[P] : never };

export type Fn = () => void;
export type Position = {
    x: number;
    y: number;
}
export type FunctionArgs<P extends any[] = any[], R = any> = (...args: P) => R;
export type MaybeRefObject<T> = T | RefObject<T>;
export type MaybeElement = Window | Document | Element | SVGElement | undefined | null;
export type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRefObject<T>;
