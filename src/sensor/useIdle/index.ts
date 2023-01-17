import { useState, useRef } from 'react';
import { useEventListener } from '../../browser/useEventListener';
import { useOnMounted } from '../../shared/useOnMounted';
import { throttleFilter, createTimestamp } from '../../helper';
import type { ConfigurableEventFilter } from '../../helper';

const defaultEvents: WindowEventName[] = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel'];

type WindowEventName = keyof WindowEventMap;

export interface UseIdleOptions extends ConfigurableEventFilter {
    /**
     * Event names that listen to for detected user activity
     *
     * @defaultValue ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel']
     */
    events?: WindowEventName[];
    initialState?: boolean;
}

export interface UseIdleReturn {
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
export function useIdle(timeout: number = 60000, options: UseIdleOptions = {}): UseIdleReturn {
    const { events = defaultEvents, initialState = false, eventFilter = throttleFilter(50) } = options;
    const [idle, setIdle] = useState(initialState);
    const [lastActive, setLastActive] = useState(createTimestamp());
    const timer = useRef<number>();

    const setupTimer = () => {
        clearTimer();

        timer.current = window.setTimeout(() => setIdle(true), timeout);
    };
    const clearTimer = () => {
        clearTimeout(timer.current);
        timer.current = undefined;
    };
    const onEvent = (e: Event) => {
        if (events.includes(e.type as WindowEventName)) {
            setIdle(false);
            setLastActive(createTimestamp());

            setupTimer();
        }
    };

    useOnMounted(setupTimer);

    useEventListener('mousemove', eventFilter(onEvent), { passive: true });
    useEventListener('mousedown', eventFilter(onEvent), { passive: true });
    useEventListener('resize', eventFilter(onEvent), { passive: true });
    useEventListener('keydown', eventFilter(onEvent), { passive: true });
    useEventListener('touchstart', eventFilter(onEvent), { passive: true });
    useEventListener('wheel', eventFilter(onEvent), { passive: true });

    return { idle, lastActive };
}
