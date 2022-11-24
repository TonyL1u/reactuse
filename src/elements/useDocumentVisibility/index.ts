import { useState } from 'react';
import { useEventListener } from '../../browser/useEventListener';

/**
 * Reactively track [`document.visibilityState`](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState).
 *
 * @example
 * ```ts
 * import { useDocumentVisibility } from 'reactuse';
 *
 * const visible = useDocumentVisibility();
 * ```
 * @returns
 * 
 */
export function useDocumentVisibility() {
    const [visible, setVisible] = useState<DocumentVisibilityState>('visible');

    useEventListener(document, 'visibilitychange', () => {
        setVisible(document.visibilityState);
    });

    return visible;
}
