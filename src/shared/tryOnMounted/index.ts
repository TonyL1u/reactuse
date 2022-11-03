import { useEffect } from 'react';

export function tryOnMounted(fn: () => void) {
    useEffect(() => {
        fn?.();
    }, []);
}
