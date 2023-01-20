import * as react from 'react';
import { RefObject, Dispatch, SetStateAction, DependencyList } from 'react';
import { DebounceSettings, DebouncedFunc } from 'lodash-es';

interface UseRafFnFnCallbackArguments {
    /**
     * Time elapsed between this and the last frame.
     */
    delta: number;
    /**
     * Time elapsed since the creation of the web page. See {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#the_time_origin Time origin}.
     */
    timestamp: DOMHighResTimeStamp;
}
interface UseRafFnOptions {
    /**
     * Run the callback function immediately
     *
     * @defaultValue true
     */
    immediate?: boolean;
}
interface UseRafFnReturn {
    isActive: boolean;
    resume: () => void;
    pause: () => void;
}
/**
 * Call function on every `requestAnimationFrame`. With controls of pausing and resuming.
 *
 * @example
 * ```ts
 * import { useState } from 'react';
 * import { useRafFn } from 'reactuse';
 *
 * const [count, setCount] = useState(0);
 * const { resume, pause } = useRafFn(() => {
 *     setCount(count + 1);
 * });
 * ```
 * @param fn - Callback function
 * @param options -
 * @returns
 */
declare function useRafFn(fn: (args: UseRafFnFnCallbackArguments) => void, options?: UseRafFnOptions): UseRafFnReturn;

interface UseTimeoutFnOptions {
    /**
     * Running the timer automatically after calling this function
     *
     * @defaultValue true
     */
    auto?: boolean;
}
interface UseTimeoutFnReturn {
    isPending: boolean;
    start: () => void;
    stop: () => void;
}
/**
 * Wrapper for `setTimeout` with controls.
 *
 * @example
 * ```ts
 * import { useTimeoutFn } from 'reactuse';
 *
 * const { start, stop } = useTimeoutFn(() => {
 *     // fired after 1000ms...
 * }, 1000)
 *
 * start(); // start timer
 * stop(); // stop timer
 * ```
 * @param cb - The function to be executed
 * @param interval -
 * @param options -
 * @returns
 */
declare function useTimeoutFn(cb: (...args: unknown[]) => any, interval: number, options?: UseTimeoutFnOptions): UseTimeoutFnReturn;

interface UseTimeoutOptions extends UseTimeoutFnOptions {
}
interface UseTimeoutReturn extends Omit<UseTimeoutFnReturn, 'isPending'> {
    ready: boolean;
}
/**
 * Update value after a given time with controls.
 *
 * @example
 * ```ts
 * import { useTimeout } from 'reactuse';
 *
 * const { ready } = useTimeout(2000);
 *
 * console.log(ready); // ready will be set to true after 2s
 * ```
 * @param interval - Change status after x ms.
 * @param options -
 * @returns
 */
declare function useTimeout(interval?: number, options?: UseTimeoutOptions): UseTimeoutReturn;

interface UseTimestampOptions {
    offset?: number;
    immediate?: boolean;
    callback?: (timestamp: number) => void;
}
/**
 * Reactive current timestamp.
 *
 * @example
 * ```ts
 * import { useTimestamp } from 'reactuse';
 *
 * const now = useTimestamp();
 * ```
 * @param options -
 * @returns
 */
declare function useTimestamp(options?: UseTimestampOptions): number;

interface UseClipboardOptions {
    /**
     * Initial copying source text
     */
    source?: string;
    /**
     * Fallback to lower api when the Clipboard API {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#the_time_origin} not supported
     */
    legacy?: boolean;
    copiedDelay?: number;
}
interface UseClipboardReturn {
    isSupported: boolean;
    copy: (source?: string) => void;
    text: string;
    copied: boolean;
}
/**
 * Reactive [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API).
 * Provides the ability to respond to clipboard commands (cut, copy, and paste) as well as to asynchronously read from and write to the system clipboard.
 * Access to the contents of the clipboard is gated behind the [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API).
 * Without user permission, reading or altering the clipboard contents is not permitted.
 *
 * @param options -
 * @returns
 */
declare function useClipboard(options?: UseClipboardOptions): {
    isSupported: boolean;
    copy: (value?: string) => Promise<void>;
    text: string;
    copied: boolean;
};

type Fn = () => void;
type FunctionArgs<P extends any[] = any[], R = any> = (...args: P) => R;
type MaybeRefObject<T> = T | RefObject<T>;
type MaybeElement = Window | Document | Element | SVGElement | undefined | null;
type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRefObject<T>;

type EventFilter<T extends FunctionArgs = FunctionArgs, R extends FunctionArgs = T> = (invoke: T) => R;
interface ConfigurableEventFilter {
    eventFilter?: EventFilter;
}

type WindowEventName$1 = keyof WindowEventMap;
type DocumentEventName = keyof DocumentEventMap;
type GeneralEventName = keyof GlobalEventHandlersEventMap;
type WindowEventListener<E extends WindowEventName$1> = (ev: WindowEventMap[E]) => any;
type DocumentEventListener<E extends DocumentEventName> = (ev: DocumentEventMap[E]) => any;
type GeneralEventListener<E extends GeneralEventName> = (ev: GlobalEventHandlersEventMap[E]) => any;
/**
 * Overload 1: Omitted Window target
 *
 * @param event
 * @param listener
 */
declare function useEventListener<E extends WindowEventName$1>(event: E, listener: WindowEventListener<E>, options?: boolean | AddEventListenerOptions): Fn;
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

interface UseDraggableOptions {
    draggingArea?: MaybeElementRef;
    wrap?: boolean;
    onStart?: (e: PointerEvent) => void | boolean;
    onDragging?: (e: PointerEvent) => void;
    onEnd?: (e: PointerEvent) => void;
}
interface UseDraggableReturn {
    x: number;
    y: number;
    style: {
        transform: string;
    };
    isDragging: boolean;
    syncPosition: (x: number, y: number) => void;
}
/**
 * Make elements draggable.
 *
 * @example
 * Under hook, `useDraggable` uses [`CSS translate`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate) to make elements draggable. You can also choose your own way to position the element. For example:
 *
 * ```ts
 * const el = useRef<HTMLDivElement>(null);
 * const { x, y } = useDraggable(el);
 * ```
 *
 * ```tsx
 * <div ref={el} style={{ position: 'absolute', top: y, left: x }}></div>
 * ```
 *
 * Sometimes you may want to restrict an element that can only be dragged in a specific area. All you need to do is giving it an dragging wrapper area (default is Window).
 *
 * ```tsx
 * import { useRef } from 'react';
 * import { useDraggable } from 'reactuse';
 *
 * export default () => {
 *     const wrapper = useRef<HTMLDivElement>(null);
 *     const el = useRef<HTMLDivElement>(null);
 *     const { style } = useDraggable(el, { wrap: true, draggingArea: wrapper });
 *
 *     return <div ref={wrapper}>
 *         <div ref={el} style={style}></div>
 *     </div>
 * }
 * ```
 * @param target - DOM element or an HTML element wrapped by `useRef()`
 * @param options -
 * @typeParam T - Type of the real HTML element
 * @returns
 */
declare function useDraggable<T extends Exclude<MaybeElement, Window | Document>>(target: MaybeElementRef<T>, options?: UseDraggableOptions): UseDraggableReturn;

type ElementBounding = {
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
declare function useElementBounding<T extends Exclude<MaybeElement, Window | Document>>(target: MaybeElementRef<T>): ElementBounding;

type ElementSize = {
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
declare function useElementSize<T extends Exclude<MaybeElement, Window | Document>>(target: MaybeElementRef<T>, options?: ResizeObserverOptions): ElementSize;

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
declare function useElementVisibility<T extends Exclude<MaybeElement, Window | Document>>(target: MaybeElementRef<T>): boolean;

type CursorState = {
    x: number;
    y: number;
};
type MouseSourceType = 'mouse' | 'touch' | null;
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
declare function useMouseInElement<T extends Exclude<MaybeElement, Window | Document>>(target: MaybeElementRef<T>, options?: UseMouseInElementOptions): UseMouseInElementReturn;

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
declare function useMutationObserver<T extends Exclude<MaybeElement, Window | Document>>(target: MaybeElementRef<T>, callback: MutationCallback, options?: MutationObserverInit): UseMutationObserverReturn;

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
declare function useResizeObserver<T extends Exclude<MaybeElement, Window | Document>>(target: MaybeElementRef<T>, callback: ResizeObserverCallback, options?: ResizeObserverOptions): UseResizeObserverReturn;

type WindowSize = {
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

type WatchStateCallback<V = any, OV = any> = (value: V, oldValue: OV) => any;
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

type WatchRefCallback<V = any, OV = any> = (value: V, oldValue: OV) => any;
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

interface UseFpsOptions {
    /**
     * Calculate the FPS on every x frames.
     *
     * @defaultValue 10
     */
    every?: number;
}
/**
 * Reactive FPS (frames per second).
 *
 * @example
 * ```ts
 * import { useFps } from 'reactuse';
 *
 * const fps = useFps();
 * ```
 * @param options -
 * @returns
 */
declare function useFps(options?: UseFpsOptions): number;

type WindowEventName = keyof WindowEventMap;
interface UseIdleOptions extends ConfigurableEventFilter {
    /**
     * Event names that listen to for detected user activity
     *
     * @defaultValue ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel']
     */
    events?: WindowEventName[];
    initialState?: boolean;
}
interface UseIdleReturn {
    idle: boolean;
    /**
     * Timestamp that the user is being active last time
     */
    lastActive: number;
}
/**
 * Tracks whether the user is being inactive.
 *
 * @example
 * ```ts
 * import { useIdle } from 'reactuse';
 *
 * const { idle, lastActive } = useIdle(2000);
 * console.log(idle);
 * ```
 * @param timeout - Set to idled after x ms
 * @param options -
 * @returns
 */
declare function useIdle(timeout?: number, options?: UseIdleOptions): UseIdleReturn;

type KeyEventGuard = (event: KeyboardEvent) => boolean;
type KeyEventHandler = (e: KeyboardEvent) => void;
type KeyFilter = string | string[] | KeyEventGuard;
interface UseKeyStrokeOptions {
    target?: MaybeElementRef;
    event?: 'keydown' | 'keyup' | 'keypress';
    passive?: boolean;
}
/**
 * Overload 1: Omitted key, listen to all keys
 *
 * @param handler - callback
 * @param options
 */
declare function useKeyStroke(handler: KeyEventHandler, options?: UseKeyStrokeOptions): Fn;
/**
 * Overload 2: Listen to a specific key
 *
 * @param key - The key to be listener
 * @param handler - callback
 * @param options -
 */
declare function useKeyStroke(key: KeyFilter, handler: KeyEventHandler, options?: UseKeyStrokeOptions): Fn;
declare function useKeyDown(key: KeyFilter, handler: KeyEventHandler, options?: Omit<UseKeyStrokeOptions, 'event'>): Fn;
declare function useKeyUp(key: KeyFilter, handler: KeyEventHandler, options?: Omit<UseKeyStrokeOptions, 'event'>): Fn;
declare function useKeyPress(key: KeyFilter, handler: KeyEventHandler, options?: Omit<UseKeyStrokeOptions, 'event'>): Fn;

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
     * @defaultValue true
     */
    passive?: boolean;
    /**
     * Custom event handler for keydown/keyup event
     */
    onEventFired?: (e: KeyboardEvent) => void | boolean;
}
type UseMagicKeysReturn = Readonly<Omit<Record<string, boolean>, keyof MagicKeysInternal> & MagicKeysInternal>;
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
declare function useParallax<T extends Exclude<MaybeElement, Window | Document>>(target: MaybeElementRef<T>, options?: UseParallaxOptions): {
    roll: number;
    tilt: number;
    source: string;
};

interface ScrollingState {
    x: number;
    y: number;
    isScrolling: boolean;
}
interface ArrivedState {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
}
interface UseScrollOptions extends ConfigurableEventFilter {
    /**
     * The check time when scrolling ends.
     * This configuration will be setting to (throttle + idle) when the `throttle` is configured.
     *
     * @defaultValue 200
     */
    idle?: number;
    /**
     * Listener options for scroll event.
     *
     * @defaultValue {capture: false, passive: true}
     */
    eventListenerOptions?: boolean | AddEventListenerOptions;
    /**
     * Trigger it when scrolling.
     */
    onScroll?: (e: Event) => void;
    /**
     * Trigger it when scrolling ends.
     */
    onStop?: (e: Event) => void;
}
interface UseScrollReturn {
    x: number;
    y: number;
    isScrolling: boolean;
    arrivedState: ArrivedState;
}
/**
 * Reactive scroll.
 *
 * @param target
 * @param options
 * @returns
 */
declare function useScroll<T extends Exclude<MaybeElement, Document>>(target: MaybeElementRef<T>, options?: UseScrollOptions): UseScrollReturn;

interface UseTextSelectionReturn {
    /**
     * Current selected text.
     */
    text: string;
    ranges: Range[];
    rects: DOMRect[];
}
/**
 * Reactively track user text selection based on [`Window.getSelection`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection).
 *
 * @example
 * ```ts
 * import { useTextSelection } from 'reactuse';
 *
 * const { text } = useTextSelection();
 * ```
 */
declare function useTextSelection(): UseTextSelectionReturn;

declare function useLatest<T>(value: T): react.MutableRefObject<T>;

declare function useReactive(): void;

declare function useUpdate(): () => void;

interface UseCounterOptions {
    min?: number;
    max?: number;
}
interface UseCounterReturn {
    count: number;
    get: () => number;
    set: (value?: number) => void;
    inc: (step?: number) => void;
    dec: (step?: number) => void;
    reset: () => void;
}
/**
 * Basic counter with utility functions.
 *
 * @example
 * ```ts
 * import { useCounter } from 'reactuse';
 *
 * const { count, inc, dec, set, reset } = useCounter();
 * ```
 * @param initialValue - The initial value of the counter.
 * @param options -
 * @returns
 */
declare function useCounter(initialValue?: number, options?: UseCounterOptions): UseCounterReturn;

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

type EventHookOn<T = any> = (fn: (param?: T) => void) => {
    off: () => void;
};
type EventHookOff<T = any> = (fn: (param?: T) => void) => void;
type EventHookTrigger<T = any> = (param?: T) => void;
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

type UseToggleReturn<T, U> = [T | U, (value?: T | U) => T | U];
/**
 * Overload 1: Omitted toggled value. The default truthy value is true and the default falsy value is false.
 */
declare function useToggle<L = false, R = true>(): UseToggleReturn<L, R>;
/**
 * Overload 2: Explicitly toggled target.
 */
declare function useToggle<L, R>(initialValue: L, toggledValue: R): UseToggleReturn<L, R>;

export { ArrivedState, CursorState, DeviceOrientationState, ElementBounding, ElementSize, EventHook, EventHookOff, EventHookOn, EventHookTrigger, KeyEventGuard, KeyEventHandler, KeyFilter, MagicKeysInternal, MouseSourceType, ScrollingState, UseClipboardOptions, UseClipboardReturn, UseCounterOptions, UseCounterReturn, UseDeviceOrientationReturn, UseDraggableOptions, UseDraggableReturn, UseFpsOptions, UseIdleOptions, UseIdleReturn, UseKeyStrokeOptions, UseMagicKeysOptions, UseMagicKeysReturn, UseMouseInElementOptions, UseMouseInElementReturn, UseMouseOptions, UseMouseReturn, UseMutationObserverReturn, UseParallaxOptions, UseRafFnFnCallbackArguments, UseRafFnOptions, UseRafFnReturn, UseResizeObserverReturn, UseScrollOptions, UseScrollReturn, UseTextSelectionReturn, UseTimeoutFnOptions, UseTimeoutFnReturn, UseTimeoutOptions, UseTimeoutReturn, UseTimestampOptions, UseTitleOptions, UseTitleReturn, UseToggleReturn, UseWindowSizeOptions, WatchRefCallback, WatchRefOptions, WatchStateCallback, WatchStateOptions, WindowSize, useClipboard, useCounter, useDebounceFn, useDeviceOrientation, useDocumentVisibility, useDraggable, useElementBounding, useElementSize, useElementVisibility, useEventHook, useEventListener, useFps, useIdle, useKeyDown, useKeyPress, useKeyStroke, useKeyUp, useLatest, useMagicKeys, useMounted, useMouse, useMouseInElement, useMutationObserver, useOnMounted, useOnUnmounted, useParallax, useRafFn, useReactive, useResizeObserver, useScroll, useTextSelection, useThrottleFn, useTimeout, useTimeoutFn, useTimestamp, useTitle, useToggle, useUpdate, useWatchRef, useWatchState, useWindowSize };
