import { useRef, useLayoutEffect } from 'react';
import { depsAreSame, isHTMLElement } from '../../helper';
import type { RefObject, DependencyList } from 'react';
import type { WatchStateOptions } from '../useWatchState';
import type {MaybeElement} from '../../helper'


export type WatchRefCallback<V = any, OV = any> = (value: V, oldValue: OV) => any;

export interface WatchRefOptions extends WatchStateOptions {
    deps?: DependencyList;
}
/**
 * Watch a ref DOM element.
 *
 * @example
 * ```ts
 * import { useRef } from 'react';
 * import { useWatchRef } from 'reactuse';
 * 
 * const el = useRef<HTMLDivElement>(null);
 * useWatchRef(el, () => {
 *     // when the ref DOM element is mounted or unmounted, callback function will be triggered... 
 * })
 * ```
 * @param source - A ref DOM element
 * @param callback - Value & old value callback
 * @param options -
 * @typeParam T - Type of the real HTML element
 * @returns
 * 
 */
export function useWatchRef<T extends MaybeElement>(source: RefObject<T>, callback: WatchRefCallback<T | null, T | null>, options: WatchRefOptions = {}) {
    if (source.current && !isHTMLElement(source.current)) {
        throw new Error(`[useWatchRef]: This hook should only be used for watching a ref DOM element. Current source type: ${typeof source.current}.`)
    }

    const { immediate = false, deps = [] } = options;
    const stopRef = useRef(false);
    const initRef = useRef(false);
    const oldSourceRef = useRef(source.current);
    const oldDepsRef = useRef<DependencyList>([]);
    const exec = () => {
        callback(source.current, oldSourceRef.current);
        oldSourceRef.current = source.current;
        oldDepsRef.current = deps;
        initRef.current = true;
    };

    immediate && !initRef.current && exec();
    useLayoutEffect(() => {
        if (stopRef.current) return;

        if (depsAreSame([source.current], [oldSourceRef.current]) && depsAreSame(deps, oldDepsRef.current)) return;

        exec();
    });

    return () => {
        stopRef.current = true;
    };
}
