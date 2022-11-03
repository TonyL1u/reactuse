import { useEffect, useRef } from 'react';

type WatchCallback<V = any, OV = any> = (value: V, oldValue: OV) => any;
type WatchOptions = { immediate?: boolean };

export function watchState<T>(source: T, callback: WatchCallback<T, T>, options: WatchOptions = {}) {
    const { immediate = false } = options;

    const oldRef = useRef(source);
    const initRef = useRef(false);
    const stopRef = useRef(false);

    useEffect(() => {
        const exec = () => callback(source, oldRef.current);
        if (stopRef.current) return;

        if (!initRef.current) {
            initRef.current = true;
            immediate && exec();
        } else {
            exec();
        }

        oldRef.current = source;
    }, [source, immediate, callback]);

    return {
        pause() {
            stopRef.current = true;
        },
        resume() {
            stopRef.current = false;
        }
    };
}
