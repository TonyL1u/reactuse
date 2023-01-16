import { useState } from 'react';
import { useEventListener } from '../../browser/useEventListener';
import { useDebounceFn } from '../../utilities/useDebounceFn';
import { bypassFilter } from '../../helper';
import type { MaybeElementRef, MaybeElement, ConfigurableEventFilter } from '../../helper';

const ARRIVED_STATE_THRESHOLD_PIXELS = 1;

export interface ScrollingState {
    x: number;
    y: number;
    isScrolling: boolean;
}

export interface ArrivedState {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
}

export interface UseScrollOptions extends ConfigurableEventFilter {
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

export interface UseScrollReturn {
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
export function useScroll<T extends Exclude<MaybeElement, Document>>(target: MaybeElementRef<T>, options: UseScrollOptions = {}): UseScrollReturn {
    const { idle = 200, eventListenerOptions, onScroll, onStop, eventFilter = bypassFilter() } = options;
    const [scrollingState, setScrollingState] = useState<ScrollingState>({ x: 0, y: 0, isScrolling: false });
    const [arrivedState, setArrivedState] = useState<ArrivedState>({ top: true, right: false, bottom: false, left: true });

    const onScrollEnd = useDebounceFn((e: Event) => {
        setScrollingState({ ...scrollingState, isScrolling: false });
        onStop?.(e);
    }, idle);

    const onScrollHandler = (e: Event) => {
        console.log(e);
        const target = e.target === document ? (e.target as Document).documentElement : (e.target as HTMLElement);
        const { scrollTop, scrollLeft, clientWidth, scrollWidth, clientHeight, scrollHeight } = target;

        setArrivedState({
            top: scrollTop <= 0,
            right: scrollLeft + clientWidth >= scrollWidth - ARRIVED_STATE_THRESHOLD_PIXELS,
            bottom: scrollTop + clientHeight >= scrollHeight - ARRIVED_STATE_THRESHOLD_PIXELS,
            left: scrollLeft <= 0
        });

        setScrollingState({ x: scrollLeft, y: scrollTop, isScrolling: true });
        onScrollEnd(e);
        onScroll?.(e);
    };

    useEventListener(target, 'scroll', eventFilter(onScrollHandler), eventListenerOptions);

    return { ...scrollingState, arrivedState };
}
