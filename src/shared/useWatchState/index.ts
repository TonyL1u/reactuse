import { useEffect, useRef } from 'react';
import { bypassFilter } from '../../helper';
import type { ConfigurableEventFilter } from '../../helper';

/** @public */
export type WatchStateCallback<V = any, OV = any> = (value: V, oldValue: OV) => any;
/** @public */
export interface WatchStateOptions extends ConfigurableEventFilter {
    immediate?: boolean;
}
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
 * @public
 */
export function useWatchState<T extends any>(source: T, callback: WatchStateCallback<T, T>, options: WatchStateOptions = {}) {
    const { immediate = false, eventFilter = bypassFilter() } = options;

    const oldRef = useRef(source);
    const initRef = useRef(false);
    const stopRef = useRef(false);
    const effectCallback = () => {
        const exec = () => callback(source, oldRef.current);
        if (stopRef.current) return;

        if (!initRef.current) {
            initRef.current = true;
            immediate && exec();
        } else {
            exec();
        }

        oldRef.current = source;
    };

    useEffect(eventFilter(effectCallback), [source]);

    return {
        pause() {
            stopRef.current = true;
        },
        resume() {
            stopRef.current = false;
        }
    };
}
