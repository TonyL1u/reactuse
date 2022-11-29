import { useEffect, useRef } from 'react';
import { isEqual } from 'lodash-es';
import { bypassFilter } from '../../helper';
import type { DependencyList } from 'react';
import type { ConfigurableEventFilter } from '../../helper';

export type WatchStateCallback<V = any, OV = any> = (value: V, oldValue: OV) => any;

export interface WatchStateOptions extends ConfigurableEventFilter {
    immediate?: boolean;
}

const depsEqual = (aDeps: DependencyList, bDeps: DependencyList = []) => {
    return isEqual(aDeps, bDeps);
};

/**
 * Watch a state value. Idea from Vue `watch` function.
 *
 * @example
 * ```ts
 * import { useState, useEffect } from 'react';
 * import { useWatchState } from 'reactuse';
 *
 * const [count, setCount] = useState(0);
 * useWatchState(count, val => {
 *   // ...
 * });
 *
 * // it's equal to
 * useEffect(() => {
 *   // ...
 * }, [count]);
 * ```
 * @param source - Source state value you need to watch
 * @param callback - Value & old value callback
 * @param options -
 * @typeParam T - Type of the state value
 * @returns
 *
 */
export function useWatchState<T extends any>(source: T, callback: WatchStateCallback<T, T>, options: WatchStateOptions = {}) {
    const { immediate = false, eventFilter = bypassFilter() } = options;

    const oldRef = useRef(source);
    const signalRef = useRef(0);
    const initRef = useRef(false);
    const stopRef = useRef(false);

    if (!depsEqual([oldRef.current], [source])) {
        oldRef.current = source;
        signalRef.current += 1;
    }

    const effectCallback = () => {
        const exec = () => callback(source, oldRef.current);
        if (stopRef.current) return;

        if (!initRef.current) {
            initRef.current = true;
            immediate && exec();
        } else {
            exec();
        }
    };

    useEffect(eventFilter(effectCallback), [signalRef.current]);

    return {
        pause() {
            stopRef.current = true;
        },
        resume() {
            stopRef.current = false;
        }
    };
}
