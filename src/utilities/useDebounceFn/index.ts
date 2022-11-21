import { useCallback } from 'react';
import { debounce } from 'lodash-es';
import { useLatest } from '../../state';
import { useOnUnmounted } from '../../shared';
import type { FunctionArgs } from '../../helper';
import type { DebounceSettings } from 'lodash-es';

export function useDebounceFn<T extends FunctionArgs>(fn: T, wait = 200, options: DebounceSettings = {}) {
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
