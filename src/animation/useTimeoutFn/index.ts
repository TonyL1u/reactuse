import { useRef, useState } from 'react';
import { useOnMounted } from '../../shared/useOnMounted';
import { useOnUnmounted } from '../../shared/useOnUnmounted';
import { useLatest } from '../../state/useLatest';

export interface UseTimeoutFnOptions {
    /**
     * Running the timer automatically after calling this function
     *
     * @defaultValue true
     */
    auto?: boolean;
}

export interface UseTimeoutFnReturn {
    isPending: boolean;
    start: () => void;
    stop: () => void;
}

/**
 * Wrapper for `setTimeout` with controls.
 *
 * @example
 * ```ts
 * import { useTimeoutFn } from 'reactuse';
 *
 * const { start, stop } = useTimeoutFn(() => {
 *     // fired after 1000ms...
 * }, 1000)
 *
 * start(); // start timer
 * stop(); // stop timer
 * ```
 * @param cb - The function to be executed
 * @param interval -
 * @param options -
 * @returns
 */
export function useTimeoutFn(cb: (...args: unknown[]) => any, interval: number, options: UseTimeoutFnOptions = {}): UseTimeoutFnReturn {
    const { auto = true } = options;
    const [pending, setPending] = useState(false);
    const fnRef = useLatest(cb);
    const timer = useRef<number>();

    const clear = () => {
        if (timer.current) {
            window.clearTimeout(timer.current);
            timer.current = undefined;
        }
    };
    const stop = () => {
        setPending(false);
        clear();
    };
    const start = (...args: unknown[]) => {
        clear();
        setPending(true);
        timer.current = window.setTimeout(() => {
            stop();
            fnRef.current(...args);
        }, interval);
    };

    useOnMounted(() => {
        if (auto) start();
    });

    useOnUnmounted(stop);

    return { isPending: pending, start, stop };
}
