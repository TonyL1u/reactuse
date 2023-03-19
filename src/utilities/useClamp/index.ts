import { useState } from 'react';
import { useWatchState } from '../../shared';
import { clamp } from '../../helper';
import type { SetStateAction } from 'react';

export type UseClampReturn = [number, (value: SetStateAction<number>) => void];

/**
 * Reactively clamp a value between two other values.
 *
 * @example
 * ```ts
 * import { useClamp } from 'reactuse';
 *
 * const MIN = 0;
 * const MAX = 10;
 * const [value, setValue] = useClamp(0, MIN, MAX);
 * ```
 *
 * @param value Default value
 * @param min Min value of the clamper
 * @param max Max value of the clamper
 * @returns
 */
export function useClamp(value: number, min: number, max: number): UseClampReturn {
    const [clamped, setClamped] = useState(clamp(value, min, max));
    const set = (value: SetStateAction<number>) => {
        if (typeof value === 'number') {
            setClamped(clamp(value, min, max));
        } else {
            setClamped(v => clamp(value(v), min, max));
        }
    };

    useWatchState([min, max], ([newMin, newMax]) => {
        set(clamp(value, newMin, newMax));
    });

    return [clamped, set];
}
