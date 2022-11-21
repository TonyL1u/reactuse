import { renderHook, fireEvent, act } from '@testing-library/react';
import { useMouseInElement } from 'reactuse';
import { FakeMouseEvent, mockResizeObserver, mockBoundingClientRect } from '../../../helper/testingUtils';

describe('useMouseInElement', () => {
    let callback: any;
    beforeEach(() => {
        mockResizeObserver(cb => (callback = cb));
    });

    test('should be defined', () => {
        expect(useMouseInElement).toBeDefined();
    });

    test('should work', () => {
        const div = document.createElement('div');
        const { result } = renderHook(() => useMouseInElement(div));

        const { returnValue, restore } = mockBoundingClientRect();
        returnValue({ width: 100, height: 100, top: 0, left: 0 });
        act(callback);

        fireEvent(window, new FakeMouseEvent('mousemove', { bubbles: true, pageX: 50, pageY: 50, clientX: 50, clientY: 50 }));
        expect(result.current).toMatchObject({ x: 50, y: 50, isOutside: false });

        fireEvent(window, new FakeMouseEvent('mousemove', { bubbles: true, pageX: 105, pageY: 105, clientX: 105, clientY: 105 }));
        expect(result.current).toMatchObject({ x: 105, y: 105, isOutside: true });

        restore();
    });
});
