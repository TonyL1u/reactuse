import { useRef } from 'react';
import { useSupported } from '../../shared/useSupported';
import { useWatchRef } from '../../shared/useWatchRef';
import { useOnUnmounted } from '../../shared/useOnUnmounted';
import type { MaybeElementRef, MaybeElement } from '../../helper';
import type { RefObject } from 'react';

/**
 * Reports changes to the dimensions of an Element's content or the border-box.
 *
 * @example
 * ```ts
 * import { useRef } from 'react';
 * import { useResizeObserver } from 'reactuse';
 *
 * const target = useRef<HTMLDivElement>(null);
 * useResizeObserver(target, ([entry]) => {
 *     // ...
 * })
 * ```
 * @param target - DOM element or an HTML element wrapped by `useRef()`
 * @param callback - ResizeObserver’s callback
 * @param options - ResizeObserver’s options
 * @typeParam T - Type of the real HTML element
 * @returns
 *
 */
export function useResizeObserver<T extends MaybeElement>(target: MaybeElementRef<T>, callback: ResizeObserverCallback, options: ResizeObserverOptions = {}) {
    const observeTarget: RefObject<T> = target && 'current' in target ? target : useRef(target);
    let ob: ResizeObserver | null = null;
    const isSupported = useSupported(() => window && 'ResizeObserver' in window);

    const clear = () => {
        if (ob) {
            ob.disconnect();
            ob = null;
        }
    };

    const stopWatch = useWatchRef(
        observeTarget,
        el => {
            clear();

            if (el) {
                ob = new ResizeObserver(callback);
                ob.observe(el as HTMLElement, options);
            }
        },
        { immediate: true }
    );

    const stop = () => {
        clear();
        stopWatch();
    };

    useOnUnmounted(stop);

    return { isSupported, stop };
}
