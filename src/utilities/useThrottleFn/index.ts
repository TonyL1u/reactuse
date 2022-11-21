import { useCallback } from 'react';
import { throttle } from 'lodash-es';
import { useLatest } from '../../state';
import { useOnUnmounted } from '../../shared';
import type { DebouncedFunc } from 'lodash-es';
import type { FunctionArgs } from '../../helper';

/**
 *
 * Throttle execution of a function. Especially useful for rate limiting execution of handlers on events like resize and scroll.
 *
 * > Throttle is a spring that throws balls: after a ball flies out it needs some time to shrink back, so it cannot throw any more balls unless it's ready.
 *
 * @example
 * ```ts
 * import { useThrottleFn } from 'reactuse';
 * const { cancel, flush } = useThrottleFn(() => {
 *     // write the callback function to be throttled here...
 * }, 1000);
 * ```
 * @param fn - The function to throttle
 * @param wait - The number of milliseconds to throttle invocations to
 * @param trailing - Specify invoking on the leading edge of the timeout
 * @param leading - Specify invoking on the trailing edge of the timeout
 * @typeParam T - Type of the throttle target
 * @returns
 * @public
 */
export function useThrottleFn<T extends FunctionArgs>(fn: T, wait = 200, trailing = true, leading = true): DebouncedFunc<(...args: Parameters<T>) => ReturnType<T>> {
    const fnRef = useLatest(fn);

    const throttled = useCallback(
        throttle(
            (...args: Parameters<T>): ReturnType<T> => {
                return fnRef.current(...args);
            },
            wait,
            { trailing, leading }
        ),
        []
    );

    useOnUnmounted(throttled.cancel);

    return throttled;
}
