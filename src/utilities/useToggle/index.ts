import { useState } from 'react';

export type UseToggleReturn<T, U> = [T | U, (value?: T | U) => T | U];

/**
 * Overload 1: Omitted toggled value. The default truthy value is true and the default falsy value is false.
 */
export function useToggle<L = false, R = true>(): UseToggleReturn<L, R>;
/**
 * Overload 2: Explicitly toggled target.
 */
export function useToggle<L, R>(initialValue: L, toggledValue: R): UseToggleReturn<L, R>;
export function useToggle<L, R>(initialValue: L = false as L, toggledValue: R = true as R): UseToggleReturn<L, R> {
    const [state, setState] = useState<L | R>(initialValue);

    const toggle = (value?: L | R) => {
        const _value = value ?? (state === initialValue ? toggledValue : initialValue);
        setState(_value);

        return _value;
    };

    return [state, toggle];
}
