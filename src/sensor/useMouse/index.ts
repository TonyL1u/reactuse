import { useState } from 'react';
import { useEventListener } from '../../browser';
import { bypassFilter } from '../../helper';
import type { ConfigurableEventFilter } from '../../helper';

type CursorState = { x: number; y: number };
type MouseSourceType = 'mouse' | 'touch' | null;
interface UseMouseOptions extends ConfigurableEventFilter {
    type?: 'page' | 'client';
    touch?: boolean;
    initialValue?: CursorState;
}

export function useMouse(options: UseMouseOptions = {}) {
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

    useEventListener('mousemove', eventFilter(mouseEvent), { passive: true });
    useEventListener('dragover', eventFilter(mouseEvent), { passive: true });
    touch && useEventListener('touchmove', eventFilter(touchEvent), { passive: true });

    return { ...cursor, sourceType };
}
