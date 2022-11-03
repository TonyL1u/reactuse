import { useEffect, useRef } from 'react';

export function tryOnUnmounted(fn: () => void) {
    const ref = useRef(fn);
    ref.current = fn;

    useEffect(
        () => () => {
            fn?.();
        },
        []
    );
}
