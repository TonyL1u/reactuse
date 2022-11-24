import { useRef, useCallback } from 'react';
import { useLatest } from '../../state/useLatest';
import { useWatchRef } from '../../shared/useWatchRef';
import { useOnUnmounted } from '../../shared/useOnUnmounted';
import { noop } from '../../helper';
import type { Fn, MaybeElementRef, MaybeElement } from '../../helper';
import type { RefObject } from 'react';

type WindowEventName = keyof WindowEventMap;
type DocumentEventName = keyof DocumentEventMap;
type GeneralEventName = keyof GlobalEventHandlersEventMap;
type WindowEventListener<E extends WindowEventName> = (ev: WindowEventMap[E]) => any;
type DocumentEventListener<E extends DocumentEventName> = (ev: DocumentEventMap[E]) => any;
type GeneralEventListener<E extends GeneralEventName> = (ev: GlobalEventHandlersEventMap[E]) => any;
/**
 * Overload 1: Omitted Window target
 *
 * @param event
 * @param listener
 */
export function useEventListener<E extends WindowEventName>(event: E, listener: WindowEventListener<E>, options?: boolean | AddEventListenerOptions): Fn;
/**
 * Overload 2: Explicitly Document target
 *
 * @param target
 * @param event
 * @param listener
 */
export function useEventListener<E extends DocumentEventName>(target: Document, event: E, listener: DocumentEventListener<E>, options?: boolean | AddEventListenerOptions): Fn;
/**
 * Overload 3: Custom target
 *
 * @param target
 * @param event
 * @param listener
 */
export function useEventListener<T extends MaybeElement, E extends GeneralEventName>(target: MaybeElementRef<T>, event: E, listener: GeneralEventListener<E>, options?: boolean | AddEventListenerOptions): Fn;
export function useEventListener<T extends MaybeElement, E extends GeneralEventName>(...args: any[]) {
    const argsOffset = typeof args[0] !== 'string';
    const observeTarget = (argsOffset ? (args[0] && 'current' in args[0] ? args[0] : useRef(args[0])) : useRef(window)) as RefObject<T>;
    const event = args[+argsOffset] as GeneralEventName;
    const listenerRef = useLatest<GeneralEventListener<E>>(args[+argsOffset + 1]);
    const options = useRef<AddEventListenerOptions>(args[+argsOffset + 2]);
    const handler = useCallback((event: Event) => listenerRef.current(event as GlobalEventHandlersEventMap[E]), [listenerRef]);
    let clear = noop;

    const stopWatch = useWatchRef(
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

    useOnUnmounted(stop);

    return stop;
}
