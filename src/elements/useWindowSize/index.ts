import { useState } from 'react';
import { useEventListener } from '../../browser';
import { useOnMounted } from '../../shared';

/** @public */
export type WindowSize = { width: number; height: number };
/** @public */
export interface UseWindowSizeOptions {
    initialWidth?: number;
    initialHeight?: number;
    listenOrientation?: boolean;
    includeScrollbar?: boolean;
}
/**
 * Reactive window size.
 *
 * @example
 * ```ts
 * import { useWindowSize } from 'reactuse';
 *
 * const { width, height } = useWindowSize();
 * ```
 * @param options -
 * @returns
 * @public
 */
export function useWindowSize(options: UseWindowSizeOptions = {}) {
    const { initialWidth = NaN, initialHeight = NaN, listenOrientation = true, includeScrollbar = true } = options;
    const [size, setSize] = useState<WindowSize>({ width: initialWidth, height: initialHeight });

    const update = () => {
        if (window) {
            setSize({
                width: includeScrollbar ? window.innerWidth : window.document.documentElement.clientWidth,
                height: includeScrollbar ? window.innerHeight : window.document.documentElement.clientHeight
            });
        }
    };

    useEventListener('resize', update, { passive: true });
    listenOrientation && useEventListener('orientationchange', update, { passive: true });

    useOnMounted(update);

    return size;
}
