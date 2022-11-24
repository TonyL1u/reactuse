import { useCallback } from 'react';
import { debounce } from 'lodash-es';
import { useLatest } from '../../state/useLatest';
import { useOnUnmounted } from '../../shared/useOnUnmounted';
import type { DebounceSettings, DebouncedFunc } from 'lodash-es';
import type { FunctionArgs } from '../../helper';

/**
 * Debounce execution of a function.
 *
 * > Debounce is an overloaded waiter: if you keep asking him your requests will be ignored until you stop and give him some time to think about your latest inquiry.
 *
 * @example
 * ```ts
 * import { useDebounceFn } from 'reactuse';
 * const { cancel, flush } = useDebounceFn(() => {
 *     // write the callback function to be debounced here...
 * }, 1000);
 * ```
 * @param fn - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @param options -
 * @returns Returns the new debounced function.
 */
export function useDebounceFn<T extends FunctionArgs>(fn: T, wait = 200, options: DebounceSettings = {}): DebouncedFunc<(...args: Parameters<T>) => ReturnType<T>> {
    const fnRef = useLatest(fn);

    const debounced = useCallback(
        debounce(
            (...args: Parameters<T>): ReturnType<T> => {
                return fnRef.current(...args);
            },
            wait,
            options
        ),
        []
    );

    useOnUnmounted(debounced.cancel);

    return debounced;
}
