import { useState } from 'react';
import { useEventListener } from '../../browser/useEventListener';
import { bypassFilter } from '../../helper';
import type { ConfigurableEventFilter } from '../../helper';

export type CursorState = {
    x: number;
    y: number;
};

export type MouseSourceType = 'mouse' | 'touch' | null;

export interface UseMouseOptions extends ConfigurableEventFilter {
    /**
     * Mouse position based by page or client
     *
     * @defaultValue 'page'
     */
    type?: 'page' | 'client';
    /**
     * Listen to `touchmove` events
     *
     * @defaultValue true
     */
    touch?: boolean;
    /**
     * Initial values
     */
    initialValue?: CursorState;
}
export interface UseMouseReturn extends CursorState {
    sourceType: MouseSourceType;
}
/**
 * Reactive mouse position.
 *
 * @example
 * ```ts
 * import { useMouse } from 'reactuse';
 *
 * const { x, y, sourceType } = useMouse();
 * ```
 * @param options -
 * @returns Your cursor's position
 *
 */
export function useMouse(options: UseMouseOptions = {}): UseMouseReturn {
    const { type = 'page', touch = true, eventFilter = bypassFilter(), initialValue = { x: NaN, y: NaN } } = options;
    const [cursor, setCursor] = useState<CursorState>({ x: initialValue.x, y: initialValue.y });
    const [sourceType, setSourceType] = useState<MouseSourceType>(null);

    const mouseEvent = (event: MouseEvent) => {
        if (type === 'page') {
            const { pageX: x, pageY: y } = event;
            setCursor({ x, y });
        } else if (type === 'client') {
            const { clientX: x, clientY: y } = event;
            setCursor({ x, y });
        }

        setSourceType('mouse');
    };

    const touchEvent = (event: TouchEvent) => {
        if (touch && event.touches.length > 0) {
            const touch = event.touches[0];
            if (type === 'page') {
                const { pageX: x, pageY: y } = touch;
                setCursor({ x, y });
            } else if (type === 'client') {
                const { clientX: x, clientY: y } = touch;
                setCursor({ x, y });
            }

            setSourceType('touch');
        }
    };

    useEventListener('mousemove', eventFilter(mouseEvent), { passive: true });
    useEventListener('dragover', eventFilter(mouseEvent), { passive: true });
    useEventListener('touchmove', eventFilter(touchEvent), { passive: true });

    return { ...cursor, sourceType };
}
