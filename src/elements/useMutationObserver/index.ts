import { useRef } from 'react';
import { useSupported, watchRef, tryOnUnmounted } from '../../shared';
import type { MaybeElementRef, MaybeElement } from '../../helper';
import type { RefObject } from 'react';

export function useMutationObserver<T extends MaybeElement = MaybeElement>(target: MaybeElementRef<T>, callback: MutationCallback, options: MutationObserverInit = {}) {
    const observeTarget: RefObject<T> = target && 'current' in target ? target : useRef(target);
    let ob: MutationObserver | null = null;
    const isSupported = useSupported(() => window && 'MutationObserver' in window);

    const clear = () => {
        if (ob) {
            ob.disconnect();
            ob = null;
        }
    };

    const stopWatch = watchRef(
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

    tryOnUnmounted(stop);

    return { isSupported, stop };
}
