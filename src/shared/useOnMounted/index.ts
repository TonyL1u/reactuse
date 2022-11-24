import { useEffect } from 'react';

/**
 * A hook that executes a function after the component is mounted.
 * 
 * @example
 * ```ts
 * import { useOnMounted } from 'reactuse';
 * 
 * useOnMounted(() => {
 *     // something you want to call when component is mounted...
 * })
 * ```
 * @param fn - The function to be executed
 * 
 */
export function useOnMounted(fn: () => void) {
    useEffect(() => {
        fn?.();
    }, []);
}
