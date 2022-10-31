import { useCallback, useRef } from 'react';
import { tryOnMounted } from '../tryOnMounted';

export function useSupported(callback: () => unknown) {
    const isSupported = useRef<boolean>(false);
    const update = useCallback(() => (isSupported.current = Boolean(callback())), [callback]);
    update();
    tryOnMounted(update);

    return isSupported.current;
}
