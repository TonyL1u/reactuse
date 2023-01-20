import { useState } from 'react';
import { useWatchState } from '../../shared/useWatchState';
import { useScroll } from '../useScroll';
import type { UseScrollOptions, UseScrollReturn } from '../useScroll';
import type { MaybeElementRef, MaybeElement } from '../../helper';

export interface UseInfiniteScrollOptions extends UseScrollOptions {
    /**
     * The minimum distance between the bottom of the element and the bottom of the viewport
     *
     * @defaultValue 0
     */
    distance?: number;
    /**
     * The direction in which to listen the scroll.
     *
     * @defaultValue 'bottom'
     */
    direction?: 'top' | 'bottom' | 'left' | 'right';
}

/**
 * Infinite scrolling of the element.
 *
 * @example
 * ```ts
 * import { useInfiniteScroll } from 'reactuse';
 *
 * const el = useRef<HTMLDivElement>(null);
 * useInfiniteScroll(el, () => {
 *     // load more method
 * })
 * ```
 * @param element - The scrolling element
 * @param onLoadMore - Load more method
 * @param options -
 */
export function useInfiniteScroll<T extends MaybeElement>(element: MaybeElementRef<T>, onLoadMore?: (state: UseScrollReturn) => void | Promise<void>, options: UseInfiniteScrollOptions = {}) {
    const { distance = 0, direction = 'bottom', ...useScrollOptions } = options;
    const [loading, setLoading] = useState(false);
    const state = useScroll(element, {
        ...useScrollOptions,
        offset: {
            [direction]: distance,
            ...useScrollOptions.offset
        }
    });

    useWatchState(state.arrivedState[direction], async isArrived => {
        if (isArrived) {
            setLoading(true);

            await onLoadMore?.(state);
            setLoading(false);
        }
    });

    return loading;
}
