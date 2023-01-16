import { useRef, useState } from 'react';
import { useOnMounted } from '../../shared/useOnMounted';
import { useLatest } from '../../state/useLatest';

export interface useRafFnFnCallbackArguments {
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
     * run fn immediately
     *
     * @defaultValue `true`
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
 * @param fn callback fn
 * @param options
 * @returns
 */
export function useRafFn(fn: (args: useRafFnFnCallbackArguments) => void, options: UseRafFnOptions = {}): UseRafFnReturn {
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
        setIsActive(false);
    }

    useOnMounted(() => {
        if (immediate) resume();
    });

    return { isActive, resume, pause };
}
