import { useState } from 'react';
import { useTimeoutFn } from '../useTimeoutFn';
import type { UseTimeoutFnOptions, UseTimeoutFnReturn } from '../useTimeoutFn';

export interface UseTimeoutOptions extends UseTimeoutFnOptions {}

export interface UseTimeoutReturn extends Omit<UseTimeoutFnReturn, 'isPending'> {
    ready: boolean;
}

/**
 * Update value after a given time with controls.
 *
 * @example
 * ```ts
 * import { useTimeout } from 'reactuse';
 *
 * const { ready } = useTimeout(2000);
 *
 * console.log(ready); // ready will be set to true after 2s
 * ```
 * @param interval - Change status after x ms.
 * @param options -
 * @returns
 */
export function useTimeout(interval: number = 1000, options: UseTimeoutOptions = {}): UseTimeoutReturn {
    const [ready, setReady] = useState(false);
    const { start, stop } = useTimeoutFn(
        () => {
            setReady(true);
        },
        interval,
        options
    );

    return { ready, start, stop };
}
