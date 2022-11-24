import { useRef } from 'react';
import { useSupported } from '../../shared/useSupported';
import { useWatchRef } from '../../shared/useWatchRef';
import { useOnUnmounted } from '../../shared/useOnUnmounted';
import type { MaybeElementRef, MaybeElement } from '../../helper';
import type { RefObject } from 'react';

/**
 * Watch for changes being made to the DOM tree. [`MutationObserver MDN`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).
 *
 * @example
 * ```ts
 * import { useState, useRef } from 'react';
 * import { useMutationObserver } from 'reactuse';
 *
 * const el = useRef<HTMLDivElement>(null);
 * useMutationObserver(el, mutations => {
 *     // ...
 * });
 * ```
 * @param target - DOM element or an HTML element wrapped by `useRef()`
 * @param callback - MutationObserver's callback
 * @param options - MutationObserver's options
 * @typeParam T - Type of the real HTML element
 * @returns
 *
 */
export function useMutationObserver<T extends MaybeElement>(target: MaybeElementRef<T>, callback: MutationCallback, options: MutationObserverInit = {}) {
    const observeTarget: RefObject<T> = target && 'current' in target ? target : useRef(target);
    let ob: MutationObserver | null = null;
    const isSupported = useSupported(() => window && 'MutationObserver' in window);

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
                ob = new MutationObserver(callback);
                ob.observe(el as HTMLElement, options);
            }
        },
        {
            immediate: true
        }
    );

    const stop = () => {
        clear();
        stopWatch();
    };

    useOnUnmounted(stop);

    return { isSupported, stop };
}
