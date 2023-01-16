import { useRef, useState } from 'react';
import { useOnUnmounted } from '../../shared/useOnUnmounted';

export interface UseTimeoutFnOptions {
    /**
     * Running the timer automatically after calling this function
     *
     * @defaultValue `true`
     */
    auto?: boolean;
}

/**
 *
 * @param cb
 * @param interval
 * @param options
 * @returns
 */
export function useTimeoutFn(cb: (...args: unknown[]) => any, interval: number, options: UseTimeoutFnOptions = {}) {
    const { auto = true } = options;
    const [pending, setPending] = useState(false);
    const hasAutoStarted = useRef(false);
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
            cb(...args);
        }, interval);
    };

    if (auto && !hasAutoStarted.current) {
        start();
        hasAutoStarted.current = true;
    }

    useOnUnmounted(stop);

    return { isPending: pending, start, stop };
}
