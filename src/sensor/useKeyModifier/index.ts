import { useState } from 'react';
import { useEventListener } from '../../browser/useEventListener';
import type { WindowEventName } from '../../helper';

const defaultEvents: WindowEventName[] = ['mousedown', 'mouseup', 'keydown', 'keyup'];

export type KeyModifier = 'Alt' | 'AltGraph' | 'CapsLock' | 'Control' | 'Fn' | 'FnLock' | 'Meta' | 'NumLock' | 'ScrollLock' | 'Shift' | 'Symbol' | 'SymbolLock';

export interface UseKeyModifierOptions {
    /**
     * Event names that will prompt update to modifier states
     *
     * @defaultValue ['mousedown', 'mouseup', 'keydown', 'keyup']
     */
    events?: WindowEventName[];
    /**
     * Initial value of the returned ref
     *
     * @defaultValue false
     */
    initial?: boolean;
}

/**
 * Reactive [Modifier State](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState).
 * Tracks state of any of the [supported modifiers](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState#browser_compatibility) - see Browser Compatibility notes.
 *
 * @example
 * ```ts
 * import { useKeyModifier } from 'reactuse';
 *
 * const Shift = useKeyModifier('Shift');
 *
 * // Press down the Shift key
 * console.log(Shift);  // true
 * ```
 * @param modifier Key modifier
 * @param options
 * @returns
 */
export function useKeyModifier<T extends KeyModifier>(modifier: T, options: UseKeyModifierOptions = {}) {
    const { events = defaultEvents, initial = false } = options;
    const [state, setState] = useState(initial);

    const onEvent = (e: KeyboardEvent | MouseEvent) => {
        if (events.includes(e.type as WindowEventName) && typeof e.getModifierState === 'function') {
            setState(e.getModifierState(modifier));
        }
    };

    useEventListener('mousemove', onEvent, { passive: true });
    useEventListener('mousedown', onEvent, { passive: true });
    useEventListener('keydown', onEvent, { passive: true });
    useEventListener('keyup', onEvent, { passive: true });

    return state;
}
