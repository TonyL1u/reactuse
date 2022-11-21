import { useCallback, useRef } from 'react';
import { useOnMounted } from '../useOnMounted';

export function useSupported(callback: () => unknown) {
    const isSupported = useRef<boolean>(false);
    const update = useCallback(() => (isSupported.current = Boolean(callback())), [callback]);
    update();
    useOnMounted(update);

    return isSupported.current;
}
