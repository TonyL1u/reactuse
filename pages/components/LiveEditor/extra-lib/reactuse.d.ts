import * as react from 'react';
import { RefObject, Dispatch, SetStateAction, DependencyList } from 'react';
import { DebounceSettings, DebouncedFunc } from 'lodash-es';

declare type Fn = () => void;
declare type FunctionArgs<P extends any[] = any[], R = any> = (...args: P) => R;
declare type MaybeRefObject<T> = T | RefObject<T>;
declare type MaybeElement = Window | Document | Element | SVGElement | undefined | null;
declare type MaybeElementRef<T extends MaybeElement> = MaybeRefObject<T>;

declare type EventFilter<T extends FunctionArgs = FunctionArgs, R extends FunctionArgs = T> = (invoke: T) => R;
interface ConfigurableEventFilter {
    eventFilter?: EventFilter;
}

declare type WindowEventName = keyof WindowEventMap;
declare type DocumentEventName = keyof DocumentEventMap;
declare type GeneralEventName = keyof GlobalEventHandlersEventMap;
declare type WindowEventListener<E extends WindowEventName> = (ev: WindowEventMap[E]) => any;
declare type DocumentEventListener<E extends DocumentEventName> = (ev: DocumentEventMap[E]) => any;
declare type GeneralEventListener<E extends GeneralEventName> = (ev: GlobalEventHandlersEventMap[E]) => any;
/**
 * Overload 1: Omitted Window target
 *
 * @param event
 * @param listener
 */
declare function useEventListener<E extends WindowEventName>(event: E, listener: WindowEventListener<E>, options?: boolean | AddEventListenerOptions): Fn;
/**
 * Overload 2: Explicitly Document target
 *
 * @param target
 * @param event
 * @param listener
 */
declare function useEventListener<E extends DocumentEventName>(target: Document, event: E, listener: DocumentEventListener<E>, options?: boolean | AddEventListenerOptions): Fn;
/**
 * Overload 3: Custom target
 *
 * @param target
 * @param event
 * @param listener
 */
declare function useEventListener<T extends MaybeElement, E extends GeneralEventName>(target: MaybeElementRef<T>, event: E, listener: GeneralEventListener<E>, options?: boolean | AddEventListenerOptions): Fn;

interface UseTitleOptions {
    observe?: boolean;
}
interface UseTitleReturn {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
}
/**
 * Overload 1: with initial title
 *
 * @param initialTitle
 */
declare function useTitle(initialTitle: string): UseTitleReturn;
/**
 * Overload 2: with options
 *
 * @param options
 */
declare function useTitle(options: UseTitleOptions): UseTitleReturn;
/**
 * Overload 3: with initial title & options
 *
 * @param initialTitle
 * @param options
 */
declare function useTitle(initialTitle?: string, options?: UseTitleOptions): UseTitleReturn;

/**
 * Reactively track [`document.visibilityState`](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState).
 *
 * @example
 * ```ts
 * import { useDocumentVisibility } from 'reactuse';
 *
 * const visible = useDocumentVisibility();
 * ```
 * @returns
 *
 */
declare function useDocumentVisibility(): DocumentVisibilityState;

declare type ElementBounding = {
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
    x: number;
    y: number;
};
/**
 * Reactive [`bounding box`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) of an HTML element.
 *
 * @example
 * ```ts
 * import { useRef } from 'react';
 * import { useElementBounding } from 'reactuse';
 *
 * const el = useRef<HTMLTextAreaElement | null>(null);
 * const bounding = useElementBounding(el);
 * ```
 * @param target - DOM element or an HTML element wrapped by `useRef()`
 * @typeParam T - Type of the real HTML element
 * @returns Bounding of the element
 *
 */
declare function useElementBounding<T extends MaybeElement>(target: MaybeElementRef<T>): ElementBounding;

declare type ElementSize = {
    width: number;
    height: number;
};
/**
 * Reactive size of an HTML element. [`ResizeObserver MDN`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).
 *
 * @example
 * ```ts
 * import { useRef } from 'react';
 * import { useElementSize } from 'reactuse';
 *
 * const el = useRef<HTMLTextAreaElement | null>(null);
 * const size = useElementSize(el);
 * ```
 * @param target - DOM element or an HTML element wrapped by `useRef()`
 * @param options - ResizeObserver’s options
 * @typeParam T - Type of the real HTML element
 * @returns Size of the element
 *
 */
declare function useElementSize<T extends MaybeElement>(target: MaybeElementRef<T>, options?: ResizeObserverOptions): ElementSize;

/**
 * Tracks the visibility of an element within the viewport.
 *
 * @example
 * ```ts
 * import { useRef } from 'react';
 * import { useElementVisibility } from 'reactuse';
 *
 * const el = useRef<HTMLDivElement>(null);
 * // visible is expected to be `false` when element is out of the viewport
 * const visible = useElementVisibility();
 * ```
 * @param target -
 * @typeParam T -
 *
 */
declare function useElementVisibility<T extends MaybeElement>(target: MaybeElementRef<T>): boolean;

declare type CursorState = {
    x: number;
    y: number;
};
declare type MouseSourceType = 'mouse' | 'touch' | null;
interface UseMouseOptions extends ConfigurableEventFilter {
    /**
     * Mouse position based by page or client
     *
     * @defaultValue 'page'
     */
    type?: 'page' | 'client';
    /**
     * Listen to `touchmove` events
     *
     * @defaultValue true
     */
    touch?: boolean;
    /**
     * Initial values
     */
    initialValue?: CursorState;
}
interface UseMouseReturn extends CursorState {
    sourceType: MouseSourceType;
}
/**
 * Reactive mouse position.
 *
 * @example
 * ```ts
 * import { useMouse } from 'reactuse';
 *
 * const { x, y, sourceType } = useMouse();
 * ```
 * @param options -
 * @returns Your cursor's position
 *
 */
declare function useMouse(options?: UseMouseOptions): UseMouseReturn;

interface UseMouseInElementOptions extends UseMouseOptions {
}
interface UseMouseInElementReturn extends UseMouseReturn {
    isOutside: boolean;
}
/**
 * Reactive mouse position related to an element.
 *
 * @example
 * ```ts
 * import { useMouseInElement } from 'reactuse';
 *
 * const { x, y, isOutside } = useMouseInElement(el);
 * ```
 * @param target - DOM element or an HTML element wrapped by `useRef()`
 * @param options -
 * @typeParam T - Type of the real HTML element
 * @returns
 *
 */
declare function useMouseInElement<T extends MaybeElement = MaybeElement>(target: MaybeElementRef<T>, options?: UseMouseInElementOptions): UseMouseInElementReturn;

interface UseMutationObserverReturn {
    isSupported: boolean;
    /**
     * To stop the observation manually
     */
    stop: () => void;
}
/**
 * Watch for changes being made to the DOM tree. [`MutationObserver MDN`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).
 *
 * @example
 * ```ts
 * import { useState, useRef } from 'react';
 * import { useMutationObserver } from 'reactuse';
 *
 * const el = useRef<HTMLDivElement>(null);
 * useMutationObserver(el, mutations => {
 *     // ...
 * });
 * ```
 * @param target - DOM element or an HTML element wrapped by `useRef()`
 * @param callback - MutationObserver's callback
 * @param options - MutationObserver's options
 * @typeParam T - Type of the real HTML element
 * @returns
 *
 */
declare function useMutationObserver<T extends MaybeElement>(target: MaybeElementRef<T>, callback: MutationCallback, options?: MutationObserverInit): UseMutationObserverReturn;

interface UseResizeObserverReturn {
    isSupported: boolean;
    /**
     * To stop the observation manually
     */
    stop: () => void;
}
/**
 * Reports changes to the dimensions of an Element's content or the border-box.
 *
 * @example
 * ```ts
 * import { useRef } from 'react';
 * import { useResizeObserver } from 'reactuse';
 *
 * const target = useRef<HTMLDivElement>(null);
 * useResizeObserver(target, ([entry]) => {
 *     // ...
 * })
 * ```
 * @param target - DOM element or an HTML element wrapped by `useRef()`
 * @param callback - ResizeObserver’s callback
 * @param options - ResizeObserver’s options
 * @typeParam T - Type of the real HTML element
 * @returns
 *
 */
declare function useResizeObserver<T extends MaybeElement>(target: MaybeElementRef<T>, callback: ResizeObserverCallback, options?: ResizeObserverOptions): UseResizeObserverReturn;

declare type WindowSize = {
    width: number;
    height: number;
};
interface UseWindowSizeOptions {
    initialWidth?: number;
    initialHeight?: number;
    listenOrientation?: boolean;
    includeScrollbar?: boolean;
}
/**
 * Reactive window size.
 *
 * @example
 * ```ts
 * import { useWindowSize } from 'reactuse';
 *
 * const { width, height } = useWindowSize();
 * ```
 * @param options -
 * @returns
 *
 */
declare function useWindowSize(options?: UseWindowSizeOptions): WindowSize;

/**
 * A hook that executes a function after the component is mounted.
 *
 * @example
 * ```ts
 * import { useOnMounted } from 'reactuse';
 *
 * useOnMounted(() => {
 *     // something you want to call when component is mounted...
 * })
 * ```
 * @param fn - The function to be executed
 *
 */
declare function useOnMounted(fn: () => void): void;

/**
 * A hook that executes the function right before the component is unmounted.
 *
 * @example
 * ```ts
 * import { useOnUnmounted } from 'reactuse';
 *
 * useOnUnmounted(() => {
 *     // something you want to call when component is unmounted...
 * })
 * ```
 * @param fn - The function to be executed
 *
 */
declare function useOnUnmounted(fn: () => void): void;

/**
 * Reactive hook mounted state.
 *
 * @example
 * ```ts
 * import { useMounted } from 'reactuse';
 *
 * const isMounted = useMounted();
 * ```
 * @returns
 *
 */
declare function useMounted(): boolean;

declare type WatchStateCallback<V = any, OV = any> = (value: V, oldValue: OV) => any;
interface WatchStateOptions extends ConfigurableEventFilter {
    immediate?: boolean;
}
/**
 * Watch a state value. Idea from Vue `watch` function.
 *
 * @example
 * ```ts
 * import { useState, useEffect } from 'react';
 * import { useWatchState } from 'reactuse';
 *
 * const [count, setCount] = useState(0);
 * useWatchState(count, val => {
 *   // ...
 * });
 *
 * // it's equal to
 * useEffect(() => {
 *   // ...
 * }, [count]);
 * ```
 * @param source - Source state value you need to watch
 * @param callback - Value & old value callback
 * @param options -
 * @typeParam T - Type of the state value
 * @returns
 *
 */
declare function useWatchState<T extends any>(source: T, callback: WatchStateCallback<T, T>, options?: WatchStateOptions): {
    pause(): void;
    resume(): void;
};

declare type WatchRefCallback<V = any, OV = any> = (value: V, oldValue: OV) => any;
interface WatchRefOptions extends WatchStateOptions {
    deps?: DependencyList;
}
/**
 * Watch a ref DOM element.
 *
 * @example
 * ```ts
 * import { useRef } from 'react';
 * import { useWatchRef } from 'reactuse';
 *
 * const el = useRef<HTMLDivElement>(null);
 * useWatchRef(el, () => {
 *     // when the ref DOM element is mounted or unmounted, callback function will be triggered...
 * })
 * ```
 * @param source - A ref DOM element
 * @param callback - Value & old value callback
 * @param options -
 * @typeParam T - Type of the real HTML element
 * @returns
 *
 */
declare function useWatchRef<T extends MaybeElement>(source: RefObject<T>, callback: WatchRefCallback<T | null, T | null>, options?: WatchRefOptions): () => void;

interface DeviceOrientationState {
    isAbsolute: boolean;
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
}
interface UseDeviceOrientationReturn extends DeviceOrientationState {
    isSupported: boolean;
}
/**
 * Reactive [`DeviceOrientationEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent). Provide web developers with information from the physical orientation of the device running the web page.
 *
 * @example
 * ```ts
 * import { useDeviceOrientation } from 'reactuse';
 *
 * const { isAbsolute, alpha, beta, gamma } = useDeviceOrientation();
 * ```
 * @returns
 *
 */
declare function useDeviceOrientation(): UseDeviceOrientationReturn;

interface MagicKeysInternal {
    /**
     * A Set of currently pressed keys
     */
    current: Set<string>;
}
interface UseMagicKeysOptions {
    /**
     * The separator that splits the combination keys
     */
    delimiter?: string;
    /**
     * Register passive listener
     *
     * @default true
     */
    passive?: boolean;
    /**
     * Custom event handler for keydown/keyup event
     */
    onEventFired?: (e: KeyboardEvent) => void | boolean;
}
declare type UseMagicKeysReturn = Readonly<Omit<Record<string, boolean>, keyof MagicKeysInternal> & MagicKeysInternal>;
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
declare function useMagicKeys(options?: UseMagicKeysOptions): UseMagicKeysReturn;

interface UseParallaxOptions {
    deviceOrientationTiltAdjust?: (i: number) => number;
    deviceOrientationRollAdjust?: (i: number) => number;
    mouseTiltAdjust?: (i: number) => number;
    mouseRollAdjust?: (i: number) => number;
}
/**
 * Create parallax effect easily. It uses `useDeviceOrientation` and fallback to `useMouse` if orientation is not supported.
 *
 * @example
 * ```ts
 * import { useParallax } from 'reactuse';
 *
 * const el = useRef<HTMLDivElement | null>(null);
 * const { roll, tilt } = useParallax(el);
 * ```
 * @param target - DOM element or an HTML element wrapped by `useRef()`
 * @param options -
 * @typeParam T - Type of the real HTML element
 * @returns
 *
 */
declare function useParallax<T extends MaybeElement = MaybeElement>(target: MaybeElementRef<T>, options?: UseParallaxOptions): {
    roll: number;
    tilt: number;
    source: string;
};

declare function useLatest<T>(value: T): react.MutableRefObject<T>;

declare function useReactive(): void;

declare function useUpdate(): () => void;

/**
 * Debounce execution of a function.
 *
 * > Debounce is an overloaded waiter: if you keep asking him your requests will be ignored until you stop and give him some time to think about your latest inquiry.
 *
 * @example
 * ```ts
 * import { useDebounceFn } from 'reactuse';
 * const { cancel, flush } = useDebounceFn(() => {
 *     // write the callback function to be debounced here...
 * }, 1000);
 * ```
 * @param fn - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @param options -
 * @returns Returns the new debounced function.
 */
declare function useDebounceFn<T extends FunctionArgs>(fn: T, wait?: number, options?: DebounceSettings): DebouncedFunc<(...args: Parameters<T>) => ReturnType<T>>;

declare type EventHookOn<T = any> = (fn: (param?: T) => void) => {
    off: () => void;
};
declare type EventHookOff<T = any> = (fn: (param?: T) => void) => void;
declare type EventHookTrigger<T = any> = (param?: T) => void;
interface EventHook<T = any> {
    on: EventHookOn<T>;
    off: EventHookOff<T>;
    trigger: EventHookTrigger<T>;
}
/**
 * Utility for creating event hooks.
 */
declare function useEventHook<T = any>(): EventHook<T>;

/**
 * Throttle execution of a function. Especially useful for rate limiting execution of handlers on events like resize and scroll.
 *
 * > Throttle is a spring that throws balls: after a ball flies out it needs some time to shrink back, so it cannot throw any more balls unless it's ready.
 *
 * @example
 * ```ts
 * import { useThrottleFn } from 'reactuse';
 * const { cancel, flush } = useThrottleFn(() => {
 *     // write the callback function to be throttled here...
 * }, 1000);
 * ```
 * @param fn - The function to throttle
 * @param wait - The number of milliseconds to throttle invocations to
 * @param trailing - Specify invoking on the leading edge of the timeout
 * @param leading - Specify invoking on the trailing edge of the timeout
 * @typeParam T - Type of the throttle target
 * @returns Returns the new throttled function.
 *
 */
declare function useThrottleFn<T extends FunctionArgs>(fn: T, wait?: number, trailing?: boolean, leading?: boolean): DebouncedFunc<(...args: Parameters<T>) => ReturnType<T>>;

export { CursorState, DeviceOrientationState, ElementBounding, ElementSize, EventHook, EventHookOff, EventHookOn, EventHookTrigger, MagicKeysInternal, MouseSourceType, UseDeviceOrientationReturn, UseMagicKeysOptions, UseMagicKeysReturn, UseMouseInElementOptions, UseMouseInElementReturn, UseMouseOptions, UseMouseReturn, UseMutationObserverReturn, UseParallaxOptions, UseResizeObserverReturn, UseTitleOptions, UseTitleReturn, UseWindowSizeOptions, WatchRefCallback, WatchRefOptions, WatchStateCallback, WatchStateOptions, WindowSize, useDebounceFn, useDeviceOrientation, useDocumentVisibility, useElementBounding, useElementSize, useElementVisibility, useEventHook, useEventListener, useLatest, useMagicKeys, useMounted, useMouse, useMouseInElement, useMutationObserver, useOnMounted, useOnUnmounted, useParallax, useReactive, useResizeObserver, useThrottleFn, useTitle, useUpdate, useWatchRef, useWatchState, useWindowSize };
