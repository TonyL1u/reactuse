import { useState } from 'react';

export interface UseCounterOptions {
    min?: number;
    max?: number;
}

export interface UseCounterReturn {
    count: number;
    get: () => number;
    set: (value?: number) => void;
    inc: (step?: number) => void;
    dec: (step?: number) => void;
    reset: () => void;
}

/**
 * Basic counter with utility functions.
 *
 * @example
 * ```ts
 * import { useCounter } from 'reactuse';
 *
 * const { count, inc, dec, set, reset } = useCounter();
 * ```
 * @param initialValue - The initial value of the counter.
 * @param options -
 * @returns
 */
export function useCounter(initialValue: number = 0, options: UseCounterOptions = {}): UseCounterReturn {
    const { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER } = options;
    const [count, setCount] = useState(initialValue);

    const inc = (step: number = 1) => setCount(Math.min(max, count + step));
    const dec = (step: number = 1) => setCount(Math.max(min, count - step));
    const get = () => count;
    const set = (value: number = count) => setCount(Math.max(min, Math.min(max, value)));
    const reset = () => setCount(initialValue);

    return { count, get, set, inc, dec, reset };
}
