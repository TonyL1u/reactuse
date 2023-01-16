import { useState } from 'react';
import { useEventListener } from '../../browser/useEventListener';
import { useWatchState } from '../../shared/useWatchState';
import { noop } from '../../helper';

export interface MagicKeysInternal {
    /**
     * A Set of currently pressed keys
     */
    current: Set<string>;
}

export interface UseMagicKeysOptions {
    /**
     * The separator that splits the combination keys
     */
    delimiter?: string;
    /**
     * Register passive listener
     *
     * @defaultValue true
     */
    passive?: boolean;
    /**
     * Custom event handler for keydown/keyup event
     */
    onEventFired?: (e: KeyboardEvent) => void | boolean;
}

export type UseMagicKeysReturn = Readonly<Omit<Record<string, boolean>, keyof MagicKeysInternal> & MagicKeysInternal>;

/**
 * Reactive keys pressed state, with magical keys combination support.
 *
 * > This hook returns a [`proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) object. So that, it's **NOT** support by <u>IE 11 or below</u>.
 *
 * @param options -
 *
 * @example
 *
 * ```ts
 * import { useMagicKeys, useWatchState } from 'reactuse';
 *
 * const { shift , \/* keys you want to monitor *\/ } = useMagicKeys();
 * useWatchState(shift, v => {
 *     // when press down the shift key, the `v` will be true
 *     if (v) {
 *         console.log('shift has been pressed');
 *     }
 * })
 * ```
 *
 * Notice that, name of the key is **CASE INSENSITIVE**. [Click here](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values) to check all available keycodes.
 *
 * You can combine any keys together with the delimiter `+`, `-` or `.` .
 *
 * ```ts
 * import { useMagicKeys, useWatchState } from 'reactuse';
 *
 * const { ctrl_a } = useMagicKeys();
 * useWatchState(ctrl_a, v => {
 *     if (v) {
 *         console.log('control + a have been pressed');
 *     }
 * })
 *
 * // or do the same thing in this way
 * const keys = useMagicKeys();
 * const ShiftA = keys['shift+a'];
 * ```
 */
export function useMagicKeys(options: UseMagicKeysOptions = {}): UseMagicKeysReturn {
    const { delimiter, passive = true, onEventFired = noop } = options;
    const [keyMap, setKeyMap] = useState<Record<string, boolean>>({});
    const [current, setCurrent] = useState(new Set<string>());

    useWatchState(current, keysSet => {
        Object.keys(keyMap).forEach(key => {
            // check combination
            if (delimiter) {
                const keys = key.split(delimiter);
                keyMap[key] = keys.every(key => keysSet.has(key));
            } else if (/[+_-]/.test(key)) {
                const keys = key.split(/[+_.-]/g).map(i => i.trim());
                keyMap[key] = keys.every(key => keysSet.has(key));
            } else {
                keyMap[key] = keysSet.has(key);
            }
        });

        setKeyMap({ ...keyMap });
    });

    useEventListener(
        'keydown',
        e => {
            setCurrent(keys => new Set([...keys, e.key.toLowerCase()]));

            return onEventFired(e);
        },
        { passive }
    );

    useEventListener(
        'keyup',
        e => {
            const newKeySet = new Set(current);
            newKeySet.delete(e.key.toLowerCase());
            setCurrent(newKeySet);

            return onEventFired(e);
        },
        { passive }
    );

    const proxy = new Proxy(keyMap, {
        get(target, p, receiver) {
            // console.log(p);
            if (typeof p !== 'string') return Reflect.get(target, p, receiver);
            if (p === 'current') return current;
            else if (!(p in keyMap)) {
                Reflect.set(target, p.toLowerCase(), false, receiver);
            }

            return Reflect.get(target, p, receiver);
        },
        set(target, p, newValue, receiver) {
            throw new Error(`[useMagicKeys]: The value in key '${String(p)}' is readonly!`);
        }
    });

    return proxy as UseMagicKeysReturn;
}
