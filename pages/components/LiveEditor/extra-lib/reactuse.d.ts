import * as react from 'react';
import { DependencyList, RefObject, Dispatch, SetStateAction } from 'react';
import { DebounceSettings, DebouncedFunc as DebouncedFunc$1 } from 'lodash-es';

declare function depsAreSame(deps: DependencyList, oldDeps: DependencyList): boolean;

declare type Merge<F extends object, S extends object> = {
    [P in keyof F | keyof S]: P extends keyof S ? S[P] : P extends keyof F ? F[P] : never;
};
declare type Fn = () => void;
declare type FunctionArgs<P extends any[] = any[], R = any> = (...args: P) => R;
declare type MaybeRefObject<T> = T | RefObject<T>;
declare type MaybeElement = Window | Document | HTMLElement | SVGElement | undefined | null;
declare type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRefObject<T>;

declare type EventFilter<T extends FunctionArgs = FunctionArgs, R extends FunctionArgs = T> = (invoke: T) => R;
interface ConfigurableEventFilter {
    eventFilter?: EventFilter;
}
declare function bypassFilter<T extends FunctionArgs>(): (invoke: T) => T;
declare function debounceFilter<T extends FunctionArgs>(ms: MaybeRefObject<number>, options?: DebounceSettings): (invoke: T) => any;
declare function throttleFilter<T extends FunctionArgs>(ms: MaybeRefObject<number>, trailing?: boolean, leading?: boolean): (invoke: T) => DebouncedFunc<(...args: Parameters<T_1>) => ReturnType<T_1>>;

declare const noop: () => void;

declare type WindowEventName = keyof WindowEventMap;
declare type EventListener<E extends WindowEventName> = (ev: WindowEventMap[E]) => any;
/**
 * Overload 1: Omitted Window target
 *
 * @param event
 * @param listener
 */
declare function useEventListener<E extends WindowEventName>(event: E, listener: EventListener<E>, options?: boolean | AddEventListenerOptions): Fn;
/**
 * Overload 2: Custom target
 *
 * @param target
 * @param event
 * @param listener
 */
declare function useEventListener<E extends WindowEventName, T extends MaybeElement = MaybeElement>(target: MaybeElementRef<T>, event: E, listener: EventListener<E>, options?: boolean | AddEventListenerOptions): Fn;

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
 * Overload 3
 *
 * @param initialTitle
 * @param options
 */
declare function useTitle(initialTitle?: string, options?: UseTitleOptions): UseTitleReturn;

/** @public */
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
 * Reactive [bounding box](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) of an HTML element.
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
 * @public
 */
declare function useElementBounding<T extends MaybeElement = MaybeElement>(target: MaybeElementRef<T>): ElementBounding;

/** @public */
declare type ElementSize = {
    width: number;
    height: number;
};
/**
 * Reactive size of an HTML element. [ResizeObserver MDN](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).
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
 * @public
 */
declare function useElementSize<T extends MaybeElement = MaybeElement>(target: MaybeElementRef<T>, options?: ResizeObserverOptions): ElementSize;

/** @public */
interface DeviceOrientationState {
    isAbsolute: boolean;
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
}
/** @public */
interface UseDeviceOrientationReturn extends DeviceOrientationState {
    isSupported: boolean;
}
/**
 * Reactive [DeviceOrientationEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent). Provide web developers with information from the physical orientation of the device running the web page.
 *
 * @example
 * ```ts
 * import { useDeviceOrientation } from 'reactuse';
 *
 * const { isAbsolute, alpha, beta, gamma } = useDeviceOrientation();
 * ```
 * @returns
 * @public
 */
declare function useDeviceOrientation(): UseDeviceOrientationReturn;

/** @public */
declare type CursorState = {
    x: number;
    y: number;
};
/** @public */
declare type MouseSourceType = 'mouse' | 'touch' | null;
/** @public */
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
 * @public
 */
declare function useMouse(options?: UseMouseOptions): {
    sourceType: MouseSourceType;
    x: number;
    y: number;
};

/** @public */
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
 * @public
 */
declare function useParallax<T extends MaybeElement = MaybeElement>(target: MaybeElementRef<T>, options?: UseParallaxOptions): {
    roll: number;
    tilt: number;
    source: string;
};

/** @public */
interface UseMouseInElementOptions extends UseMouseOptions {
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
 * @public
 */
declare function useMouseInElement<T extends MaybeElement = MaybeElement>(target: MaybeElementRef<T>, options?: UseMouseInElementOptions): {
    x: number;
    y: number;
    isOutside: boolean;
};

declare function useMutationObserver<T extends MaybeElement = MaybeElement>(target: MaybeElementRef<T>, callback: MutationCallback, options?: MutationObserverInit): {
    isSupported: boolean;
    stop: () => void;
};

declare function useResizeObserver<T extends MaybeElement = MaybeElement>(target: MaybeElementRef<T>, callback: ResizeObserverCallback, options?: ResizeObserverOptions): {
    isSupported: boolean;
    stop: () => void;
};

/** @public */
declare type WindowSize = {
    width: number;
    height: number;
};
/** @public */
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
 * @public
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
 * @public
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
 * @param fn The function to be executed
 * @public
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
 * @public
 */
declare function useMounted(): boolean;

declare function useSupported(callback: () => unknown): boolean;

/** @public */
declare type WatchStateCallback<V = any, OV = any> = (value: V, oldValue: OV) => any;
/** @public */
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
 * @public
 */
declare function useWatchState<T extends any>(source: T, callback: WatchStateCallback<T, T>, options?: WatchStateOptions): {
    pause(): void;
    resume(): void;
};

/** @public */
declare type WatchRefCallback<V = any, OV = any> = (value: V, oldValue: OV) => any;
/** @public */
interface WatchRefOptions extends WatchStateOptions {
    deps?: DependencyList;
}
/**
 * Watch a ref object value. It's always be used for watching a DOM element.
 *
 * @example
 * ```ts
 * import { useRef } from 'react';
 * import { useWatchRef } from 'reactuse';
 *
 * const el = useRef<HTMLDivElement>(null);
 * useWatchRef(el, () => {
 *     // when the ref object element is mounted or unmounted, callback function will be triggered...
 * })
 * ```
 * @param source - A ref object
 * @param callback - Value & old value callback
 * @param options -
 * @returns
 * @public
 */
declare function useWatchRef<T>(source: RefObject<T>, callback: WatchRefCallback<T | null, T | null>, options?: WatchRefOptions): () => void;

declare function useLatest<T>(value: T): react.MutableRefObject<T>;

declare function useReactive(): void;

declare function useUpdate(): () => void;

declare function useDebounceFn<T extends FunctionArgs>(fn: T, wait?: number, options?: DebounceSettings): any;

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
declare function useEventHook<T = any>(): EventHook<T>;

/**
 *
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
 * @returns
 * @public
 */
declare function useThrottleFn<T extends FunctionArgs>(fn: T, wait?: number, trailing?: boolean, leading?: boolean): DebouncedFunc$1<(...args: Parameters<T>) => ReturnType<T>>;

export { ConfigurableEventFilter, CursorState, DeviceOrientationState, ElementBounding, ElementSize, EventFilter, EventHook, EventHookOff, EventHookOn, EventHookTrigger, Fn, FunctionArgs, MaybeElement, MaybeElementRef, MaybeRefObject, Merge, MouseSourceType, UseDeviceOrientationReturn, UseMouseInElementOptions, UseMouseOptions, UseParallaxOptions, UseWindowSizeOptions, WatchRefCallback, WatchRefOptions, WatchStateCallback, WatchStateOptions, WindowSize, bypassFilter, debounceFilter, depsAreSame, noop, throttleFilter, useDebounceFn, useDeviceOrientation, useElementBounding, useElementSize, useEventHook, useEventListener, useLatest, useMounted, useMouse, useMouseInElement, useMutationObserver, useOnMounted, useOnUnmounted, useParallax, useReactive, useResizeObserver, useSupported, useThrottleFn, useTitle, useUpdate, useWatchRef, useWatchState, useWindowSize };
