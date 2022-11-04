import { useDebounceFn, useThrottleFn } from '../utilities';
import type { FunctionArgs, MaybeRefObject } from './types';
import type { DebounceSettings } from 'lodash-es';

export type EventFilter<T extends FunctionArgs = FunctionArgs, R extends FunctionArgs = T> = (invoke: T) => R;

export interface ConfigurableEventFilter {
    eventFilter?: EventFilter;
}

export function bypassFilter<T extends FunctionArgs>() {
    return (invoke: T) => invoke;
}

export function debounceFilter<T extends FunctionArgs>(ms: MaybeRefObject<number>, options: DebounceSettings = {}) {
    return (invoke: T) => useDebounceFn(invoke, typeof ms === 'number' ? ms : ms.current!, options);
}

export function throttleFilter<T extends FunctionArgs>(ms: MaybeRefObject<number>, trailing = true, leading = true) {
    return (invoke: T) => useThrottleFn(invoke, typeof ms === 'number' ? ms : ms.current!, trailing, leading);
}
