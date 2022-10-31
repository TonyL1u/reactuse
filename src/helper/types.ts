import type { RefObject } from 'react';

export type Merge<F extends object, S extends object> = { [P in keyof F | keyof S]: P extends keyof S ? S[P] : P extends keyof F ? F[P] : never };
export type Fn = () => void;
export type MaybeRefObject<T> = T | RefObject<T>;
export type MaybeElement = Window | Document | HTMLElement | SVGElement | undefined | null;
export type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRefObject<T>;
