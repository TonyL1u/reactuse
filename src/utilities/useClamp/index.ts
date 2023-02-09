import { useState } from 'react';
import { clamp } from '../../helper';
import type { SetStateAction } from 'react';

/**
 * Reactively clamp a value between two other values.
 * 
 * @param value Default value
 * @param min 
 * @param max 
 * @returns 
 */
export function useClamp(value: number, min: number, max: number): [number, (value: SetStateAction<number>) => void] {
    const [clamped, setClamped] = useState(clamp(value, min, max));
    const set = (value: SetStateAction<number>) => {
        if (typeof value === 'number') {
            setClamped(clamp(value, min, max));
        } else {
            setClamped(v => clamp(value(v), min, max))
        }
    };

    return [clamped, set];
}
