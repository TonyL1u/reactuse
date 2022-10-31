import { useRef, useLayoutEffect } from 'react';
import { depsAreSame } from '../../helper';
import type { RefObject, DependencyList } from 'react';

type WatchCallback<V = any, OV = any> = (value: V, oldSourceRef: OV) => any;
type WatchOptions = { immediate?: boolean; deps?: DependencyList };

export function watchRef<T>(source: RefObject<T>, callback: WatchCallback<T, T>, options: WatchOptions = {}) {
    const { immediate = false, deps = [] } = options;

    const stopRef = useRef(false);
    const initRef = useRef(false);
    const oldSourceRef = useRef(source.current);
    const oldDepsRef = useRef<DependencyList>([]);
    const exec = () => {
        callback(source.current as T, oldSourceRef.current as T);
        oldSourceRef.current = source.current;
        oldDepsRef.current = deps;
        initRef.current = true;
    };

    immediate && !initRef.current && exec();
    useLayoutEffect(() => {
        if (stopRef.current) return;

        if (depsAreSame([source.current], [oldSourceRef.current]) && depsAreSame(deps, oldDepsRef.current)) return;

        exec();
    });

    return () => {
        stopRef.current = true;
    };
}
