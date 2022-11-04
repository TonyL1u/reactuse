import { useEffect, useRef } from 'react';
import { bypassFilter } from '../../helper';
import type { ConfigurableEventFilter } from '../../helper';

type WatchCallback<V = any, OV = any> = (value: V, oldValue: OV) => any;
interface WatchOptions extends ConfigurableEventFilter {
    immediate?: boolean;
}

export function watchState<T>(source: T, callback: WatchCallback<T, T>, options: WatchOptions = {}) {
    const { immediate = false, eventFilter = bypassFilter() } = options;

    const oldRef = useRef(source);
    const initRef = useRef(false);
    const stopRef = useRef(false);
    const effectCallback = () => {
        const exec = () => callback(source, oldRef.current);
        if (stopRef.current) return;

        if (!initRef.current) {
            initRef.current = true;
            immediate && exec();
        } else {
            exec();
        }

        oldRef.current = source;
    };

    useEffect(eventFilter(effectCallback), [source]);

    return {
        pause() {
            stopRef.current = true;
        },
        resume() {
            stopRef.current = false;
        }
    };
}
