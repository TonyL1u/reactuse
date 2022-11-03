import { renderHook, fireEvent } from '@testing-library/react';
import { useMouse } from 'reactuse';

interface MouseEventWithOffsets extends MouseEventInit {
    pageX?: number;
    pageY?: number;
    offsetX?: number;
    offsetY?: number;
    x?: number;
    y?: number;
}

class FakeMouseEvent extends MouseEvent {
    constructor(type: string, values: MouseEventWithOffsets) {
        const { pageX = 0, pageY = 0, offsetX = 0, offsetY = 0, x = 0, y = 0, ...mouseValues } = values;
        super(type, mouseValues);

        Object.assign(this, { offsetX, offsetY, pageX, pageY, x, y });
    }
}

describe('useMouse', () => {
    test('should be defined', () => {
        expect(useMouse).toBeDefined();
    });

    test('should work', () => {
        const { result } = renderHook(() => useMouse());
        expect(result.current).toMatchObject({ x: NaN, y: NaN, sourceType: null });

        fireEvent(window, new FakeMouseEvent('mousemove', { bubbles: true, pageX: 200, pageY: 100, clientX: 200, clientY: 100 }));
        expect(result.current).toMatchObject({ x: 200, y: 100, sourceType: 'mouse' });
    });

    test('should work with touch event', () => {
        const { result } = renderHook(() => useMouse());
        expect(result.current).toMatchObject({ x: NaN, y: NaN, sourceType: null });

        // @ts-ignore
        fireEvent(window, new TouchEvent('touchmove', { touches: [{ pageX: 200, pageY: 100, clientX: 200, clientY: 100 }] }));
        expect(result.current).toMatchObject({ x: 200, y: 100, sourceType: 'touch' });
    });
});
