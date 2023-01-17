import { useRef, useState } from 'react';
import { useOnMounted } from '../../shared/useOnMounted';
import { useOnUnmounted } from '../../shared/useOnUnmounted';
import { useLatest } from '../../state/useLatest';

export interface UseRafFnFnCallbackArguments {
    /**
     * Time elapsed between this and the last frame.
     */
    delta: number;
    /**
     * Time elapsed since the creation of the web page. See {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#the_time_origin Time origin}.
     */
    timestamp: DOMHighResTimeStamp;
}

export interface UseRafFnOptions {
    /**
     * Run the callback function immediately
     *
     * @defaultValue true
     */
    immediate?: boolean;
}

export interface UseRafFnReturn {
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
export function useRafFn(fn: (args: UseRafFnFnCallbackArguments) => void, options: UseRafFnOptions = {}): UseRafFnReturn {
    const { immediate = true } = options;
    const fnRef = useLatest(fn);
    const [isActive, setIsActive] = useState(false);
    const rafId = useRef<number | null>(null);
    const prevFrameTimestamp = useRef(0);

    function loop(timestamp: DOMHighResTimeStamp) {
        const delta = timestamp - prevFrameTimestamp.current;
        fnRef.current({ delta, timestamp });
        prevFrameTimestamp.current = timestamp;
        rafId.current = window.requestAnimationFrame(loop);
    }
    function resume() {
        if (isActive) return;

        rafId.current = window.requestAnimationFrame(loop);
        setIsActive(true);
    }
    function pause() {
        if (!isActive || rafId.current === null) return;

        window.cancelAnimationFrame(rafId.current);
        rafId.current = null;
        setIsActive(false);
    }

    useOnMounted(() => {
        if (immediate) resume();
    });

    useOnUnmounted(pause);

    return { isActive, resume, pause };
}
