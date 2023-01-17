import { useEventListener } from '../../browser/useEventListener';
import { useLatest } from '../../state/useLatest';
import type { Fn, MaybeElementRef } from '../../helper';

export type KeyEventGuard = (event: KeyboardEvent) => boolean;
export type KeyEventHandler = (e: KeyboardEvent) => void;
export type KeyFilter = string | string[] | KeyEventGuard;
export interface UseKeyStrokeOptions {
    target?: MaybeElementRef;
    event?: 'keydown' | 'keyup' | 'keypress';
    passive?: boolean;
}

const createEventGuard = (key: KeyFilter | null) => {
    if (typeof key === 'function') return key;
    else if (typeof key === 'string') return (e: KeyboardEvent) => key === e.key;
    else if (Array.isArray(key)) return (e: KeyboardEvent) => key.includes(e.key);
    else return () => true;
};

/**
 * Overload 1: Omitted key, listen to all keys
 *
 * @param handler - callback
 * @param options
 */
export function useKeyStroke(handler: KeyEventHandler, options?: UseKeyStrokeOptions): Fn;
/**
 * Overload 2: Listen to a specific key
 *
 * @param key - The key to be listener
 * @param handler - callback
 * @param options -
 */
export function useKeyStroke(key: KeyFilter, handler: KeyEventHandler, options?: UseKeyStrokeOptions): Fn;
export function useKeyStroke(...args: any[]) {
    const argsOffset = typeof args[0] !== 'function';
    const key = useLatest<KeyFilter | null>(argsOffset ? args[0] : null);
    const handler = useLatest<KeyEventHandler>(argsOffset ? args[1] : args[0]);
    const { target = window, event = 'keydown', passive = true } = ((argsOffset ? args[2] : args[1]) ?? {}) as UseKeyStrokeOptions;

    const guard = createEventGuard(key.current);
    const listener = (e: KeyboardEvent) => {
        if (guard(e)) handler.current(e);
    };

    return useEventListener(target, event, listener, passive);
}

export function useKeyDown(key: KeyFilter, handler: KeyEventHandler, options: Omit<UseKeyStrokeOptions, 'event'> = {}) {
    return useKeyStroke(key, handler, { ...options, event: 'keydown' });
}
export function useKeyUp(key: KeyFilter, handler: KeyEventHandler, options: Omit<UseKeyStrokeOptions, 'event'> = {}) {
    return useKeyStroke(key, handler, { ...options, event: 'keyup' });
}
export function useKeyPress(key: KeyFilter, handler: KeyEventHandler, options: Omit<UseKeyStrokeOptions, 'event'> = {}) {
    return useKeyStroke(key, handler, { ...options, event: 'keypress' });
}
