import { useState } from 'react';
import { useOnMounted } from '../useOnMounted';

/**
 * Reactive hook mounted state.
 *
 * @example
 * ```ts
 * import { useMounted } from 'reactuse';
 *
 * const isMounted = useMounted();
 * ```
 * @returns
 * 
 */
export function useMounted() {
    const [isMounted, update] = useState(false);

    useOnMounted(() => {
        update(true);
    });

    return isMounted;
}
