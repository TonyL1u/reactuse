import { RefObject, Dispatch, SetStateAction, DependencyList } from 'react';
import { Location } from 'react-router-dom';

declare type Merge<F extends object, S extends object> = {
    [P in keyof F | keyof S]: P extends keyof S ? S[P] : P extends keyof F ? F[P] : never;
};
declare type Fn = () => void;
declare type MaybeRefObject<T> = T | RefObject<T>;
declare type MaybeElement = Window | Document | HTMLElement | SVGElement | undefined | null;
declare type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRefObject<T>;

declare type FunctionArgs<Args extends any[] = any[], Return = void> = (...args: Args) => Return;
interface FunctionWrapperOptions<Args extends any[] = any[], This = any> {
    fn: FunctionArgs<Args, This>;
    args: Args;
    thisArg: This;
}
declare type EventFilter<Args extends any[] = any[], This = any> = (invoke: Fn, options: FunctionWrapperOptions<Args, This>) => void;

declare type WindowEventName = keyof WindowEventMap;
declare type EventListener<E extends WindowEventName> = (ev: WindowEventMap[E]) => any;
/**
 * Overload 1: Omitted Window target
 *
 * @param event
 * @param listener
 */
declare function useEventListener<E extends WindowEventName, T extends MaybeElement = Window>(event: E, listener: EventListener<E>, options?: boolean | AddEventListenerOptions): Fn;
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

declare type ElementSize = {
    width: number;
    height: number;
};
declare function useElementSize<T extends MaybeElement = MaybeElement>(target: MaybeElementRef<T>, options?: ResizeObserverOptions): ElementSize;

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

declare type HookPayload<T extends keyof Location> = Merge<Record<T, Location[T]>, {
    location: Location;
}>;
declare function useRouter(): {
    onLocationChange<T extends string | number | symbol>(key: T, callback: (param: HookPayload<T>) => void, options?: {
        immediately?: boolean;
    }): () => void;
};

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
declare type WatchOptions = {
    immediate?: boolean;
};
declare function watchState<T>(source: T, callback: WatchCallback<T, T>, options?: WatchOptions): {
    pause(): void;
    resume(): void;
};

declare type CursorState = {
    x: number;
    y: number;
};
declare type MouseSourceType = 'mouse' | 'touch' | null;
interface UseMouseOptions {
    type?: 'page' | 'client';
    touch?: boolean;
    eventFilter?: EventFilter;
    initialValue?: CursorState;
}
declare function useMouse(options?: UseMouseOptions): {
    sourceType: MouseSourceType;
    x: number;
    y: number;
};

declare type EventHookOn<T = any> = (fn: (param: T) => void) => {
    off: () => void;
};
declare type EventHookOff<T = any> = (fn: (param: T) => void) => void;
declare type EventHookTrigger<T = any> = (param: T) => void;
interface EventHook<T = any> {
    on: EventHookOn<T>;
    off: EventHookOff<T>;
    trigger: EventHookTrigger<T>;
}
declare function useEventHook<T = any>(): EventHook<T>;

export { EventHook, EventHookOff, EventHookOn, EventHookTrigger, tryOnMounted, tryOnUnmounted, useElementBounding, useElementSize, useEventHook, useEventListener, useMounted, useMouse, useMutationObserver, useResizeObserver, useRouter, useSupported, useTitle, useWindowSize, watchRef, watchState };
