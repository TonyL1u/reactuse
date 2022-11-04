import { useRef, useCallback } from 'react';
import { useLatest } from '../../state';
import { watchRef, tryOnUnmounted } from '../../shared';
import { noop } from '../../helper';
import type { Fn, MaybeElementRef, MaybeElement } from '../../helper';
import type { RefObject } from 'react';

type WindowEventName = keyof WindowEventMap;
type EventListener<E extends WindowEventName> = (ev: WindowEventMap[E]) => any;

/**
 * Overload 1: Omitted Window target
 *
 * @param event
 * @param listener
 */
export function useEventListener<E extends WindowEventName>(event: E, listener: EventListener<E>, options?: boolean | AddEventListenerOptions): Fn;

/**
 * Overload 2: Custom target
 *
 * @param target
 * @param event
 * @param listener
 */
export function useEventListener<E extends WindowEventName, T extends MaybeElement = MaybeElement>(target: MaybeElementRef<T>, event: E, listener: EventListener<E>, options?: boolean | AddEventListenerOptions): Fn;

export function useEventListener<E extends WindowEventName, T extends MaybeElement = MaybeElement>(...args: any[]) {
    const argsOffset = typeof args[0] !== 'string';
    const observeTarget = (argsOffset ? (args[0] && 'current' in args[0] ? args[0] : useRef(args[0])) : useRef(window)) as RefObject<T>;
    const event = args[+argsOffset] as WindowEventName;
    const listenerRef = useLatest<EventListener<E>>(args[+argsOffset + 1]);
    const options = useRef<AddEventListenerOptions>(args[+argsOffset + 2]);
    const handler = useCallback((event: Event) => listenerRef.current(event as WindowEventMap[E]), [listenerRef]);
    let clear = noop;

    const stopWatch = watchRef(
        observeTarget,
        el => {
            clear();

            if (el) {
                el.addEventListener(event, handler, options.current);

                clear = () => {
                    el.removeEventListener(event, handler, options.current);
                    clear = noop;
                };
            }
        },
        { immediate: true, deps: [event, options] }
    );

    const stop = () => {
        clear();
        stopWatch();
    };

    tryOnUnmounted(stop);

    return stop;
}
