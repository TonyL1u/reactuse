import { useState, useMemo } from 'react';

export interface UseCycleListOptions {
    /**
     * The default index of the list.
     *
     * @defaultValue 0
     */
    initialIndex?: number;
}

export interface UseCycleListReturn<T> {
    index: number;
    current: T;
    prev: (step?: number) => T;
    next: (step?: number) => T;
    seek: (i?: number) => T;
}

/**
 * Cycle through a list of items.
 *
 * @example
 * ```ts
 * import { useCycleList } from 'reactuse';
 *
 * const { current, next, prev } = useCycleList(['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'] as const);
 *
 * console.log(current); // 'Mon'
 *
 * next();
 * console.log(current); // 'Tues'
 * ```
 * @param list - Cycle list data
 * @param options -
 * @returns
 */
export function useCycleList<T>(list: readonly T[], options: UseCycleListOptions = {}): UseCycleListReturn<T> {
    const { initialIndex = 0 } = options;
    const [index, setIndex] = useState(initialIndex);
    const data = useMemo(() => list[index], [list, index]);

    const seek = (i = index) => {
        const length = list.length;
        const newIndex = ((i % length) + length) % length;
        setIndex(newIndex);

        return list[newIndex];
    };
    const prev = (step = 1) => seek(index - step);
    const next = (step = 1) => seek(index + step);

    return { index, current: data, prev, next, seek };
}
