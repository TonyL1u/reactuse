import { useState } from 'react';
import { useEventListener } from '../../browser';
import { tryOnMounted } from '../../shared';

type WindowSize = { width: number; height: number };
interface UseWindowSizeOptions {
    initialWidth?: number;
    initialHeight?: number;
    listenOrientation?: boolean;
    includeScrollbar?: boolean;
}

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

    tryOnMounted(update);

    return size;
}
