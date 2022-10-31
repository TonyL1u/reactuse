import { useState, useCallback } from 'react';
import { useEventListener } from '../../browser';
import type { EventFilter } from '../../helper';

type CursorState = { x: number; y: number };
type MouseSourceType = 'mouse' | 'touch' | null;
interface UseMouseOptions {
    type?: 'page' | 'client';
    touch?: boolean;
    eventFilter?: EventFilter;
    initialValue?: CursorState;
}

export function useMouse(options: UseMouseOptions = {}) {
    const { type = 'page', touch = true, eventFilter, initialValue = { x: NaN, y: NaN } } = options;
    const [cursor, setCursor] = useState<CursorState>({ x: initialValue.x, y: initialValue.y });
    const [sourceType, setSourceType] = useState<MouseSourceType>(null);
    const mouseHandlerWrapper = useCallback((event: MouseEvent) => (eventFilter === void 0 ? mouseEvent(event) : eventFilter(() => mouseEvent(event), {} as any)), [type, eventFilter]);
    const touchHandleWrapper = useCallback((event: TouchEvent) => (eventFilter === void 0 ? touchEvent(event) : eventFilter(() => touchEvent(event), {} as any)), [type, eventFilter]);

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
        if (event.touches.length > 0) {
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

    useEventListener('mousemove', mouseHandlerWrapper, { passive: true });
    useEventListener('dragover', mouseHandlerWrapper, { passive: true });
    touch && useEventListener('touchmove', touchHandleWrapper, { passive: true });

    return { ...cursor, sourceType };
}
