import { useRef } from 'react';
import { useSupported, watchRef, tryOnUnmounted } from '../../shared';
import type { MaybeElementRef, MaybeElement } from '../../helper';
import type { RefObject } from 'react';

export function useResizeObserver<T extends MaybeElement = MaybeElement>(target: MaybeElementRef<T>, callback: ResizeObserverCallback, options: ResizeObserverOptions = {}) {
    const observeTarget: RefObject<T> = target && 'current' in target ? target : useRef(target);
    let ob: ResizeObserver | null = null;
    const isSupported = useSupported(() => window && 'ResizeObserver' in window);

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

    tryOnUnmounted(stop);

    return { isSupported, stop };
}
