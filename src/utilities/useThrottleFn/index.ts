import { useCallback } from 'react';
import { throttle } from 'lodash-es';
import { useLatest } from '../../state';
import { tryOnUnmounted } from '../../shared';
import type { FunctionArgs } from '../../helper';

export function useThrottleFn<T extends FunctionArgs>(fn: T, wait = 200, trailing = true, leading = true) {
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

    tryOnUnmounted(throttled.cancel);

    return throttled;
}
