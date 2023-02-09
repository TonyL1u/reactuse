import { useState, useRef } from 'react';
import { useRafFn } from '../../animation/useRafFn';

export interface UseFpsOptions {
    /**
     * Calculate the FPS on every x frames.
     *
     * @defaultValue 10
     */
    every?: number;
}

/**
 * Reactive FPS (frames per second).
 *
 * @example
 * ```ts
 * import { useFps } from 'reactuse';
 *
 * const fps = useFps();
 * ```
 * @param options
 * @returns
 */
export function useFps(options: UseFpsOptions = {}) {
    const { every = 10 } = options;
    const [fps, setFps] = useState(0);
    const lastRef = useRef(performance.now());
    const ticksRef = useRef(0);

    useRafFn(() => {
        ticksRef.current++;

        if (ticksRef.current >= every) {
            const now = performance.now();
            const diff = now - lastRef.current;

            setFps(~~((1000 * ticksRef.current) / diff));
            lastRef.current = now;
            ticksRef.current = 0;
        }
    });

    return fps;
}
