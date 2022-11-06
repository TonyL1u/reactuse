import * as react from 'react';
import { DependencyList, RefObject, Dispatch, SetStateAction } from 'react';
import { DebounceSettings } from 'lodash-es';

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
declare function throttleFilter<T extends FunctionArgs>(ms: MaybeRefObject<number>, trailing?: boolean, leading?: boolean): (invoke: T) => any;

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
declare function useElementBounding<T extends MaybeElement = MaybeElement>(target: MaybeElementRef<T>): ElementBounding;

declare type ElementSize = {
    width: number;
    height: number;
};
declare function useElementSize<T extends MaybeElement = MaybeElement>(target: MaybeElementRef<T>, options?: ResizeObserverOptions): ElementSize;

declare function useDeviceOrientation(): {
    isAbsolute: boolean;
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
    isSupported: boolean;
};

declare type CursorState = {
    x: number;
    y: number;
};
declare type MouseSourceType = 'mouse' | 'touch' | null;
interface UseMouseOptions extends ConfigurableEventFilter {
    type?: 'page' | 'client';
    touch?: boolean;
    initialValue?: CursorState;
}
declare function useMouse(options?: UseMouseOptions): {
    sourceType: MouseSourceType;
    x: number;
    y: number;
};

interface UseParallaxOptions {
    deviceOrientationTiltAdjust?: (i: number) => number;
    deviceOrientationRollAdjust?: (i: number) => number;
    mouseTiltAdjust?: (i: number) => number;
    mouseRollAdjust?: (i: number) => number;
}
declare function useParallax<T extends MaybeElement = MaybeElement>(target: MaybeElementRef<T>, options?: UseParallaxOptions): {
    roll: number;
    tilt: number;
    source: string;
};

interface UseMouseInElementOptions extends UseMouseOptions {
}
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
declare function useWindowSize(options?: UseWindowSizeOptions): WindowSize;

declare function tryOnMounted(fn: () => void): void;

declare function tryOnUnmounted(fn: () => void): void;

declare function useMounted(): boolean;

declare function useSupported(callback: () => unknown): boolean;

declare type WatchCallback$1<V = any, OV = any> = (value: V, oldSourceRef: OV) => any;
declare type WatchOptions$1 = {
    immediate?: boolean;
    deps?: DependencyList;
};
declare function watchRef<T>(source: RefObject<T>, callback: WatchCallback$1<T, T>, options?: WatchOptions$1): () => void;

declare type WatchCallback<V = any, OV = any> = (value: V, oldValue: OV) => any;
interface WatchOptions extends ConfigurableEventFilter {
    immediate?: boolean;
}
declare function watchState<T>(source: T, callback: WatchCallback<T, T>, options?: WatchOptions): {
    pause(): void;
    resume(): void;
};

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

declare function useThrottleFn<T extends FunctionArgs>(fn: T, wait?: number, trailing?: boolean, leading?: boolean): any;

export { ConfigurableEventFilter, EventFilter, EventHook, EventHookOff, EventHookOn, EventHookTrigger, Fn, FunctionArgs, MaybeElement, MaybeElementRef, MaybeRefObject, Merge, UseMouseOptions, UseParallaxOptions, bypassFilter, debounceFilter, depsAreSame, noop, throttleFilter, tryOnMounted, tryOnUnmounted, useDebounceFn, useDeviceOrientation, useElementBounding, useElementSize, useEventHook, useEventListener, useLatest, useMounted, useMouse, useMouseInElement, useMutationObserver, useParallax, useReactive, useResizeObserver, useSupported, useThrottleFn, useTitle, useUpdate, useWindowSize, watchRef, watchState };