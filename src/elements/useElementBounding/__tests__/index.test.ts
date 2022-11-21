import { renderHook, act } from '@testing-library/react';
import { useElementBounding } from 'reactuse';
import { mockResizeObserver, mockBoundingClientRect } from '../../../helper/testingUtils';

describe('useElementBounding', () => {
    let callback: any;
    beforeEach(() => {
        mockResizeObserver(cb => (callback = cb));
    });

    test('should be defined', () => {
        expect(useElementBounding).toBeDefined();
    });

    test('should work', () => {
        const div = document.createElement('div');
        const { result } = renderHook(() => useElementBounding(div));

        const { returnValue, restore } = mockBoundingClientRect();
        returnValue({ width: 100, height: 50 });
        act(callback);
        const { width, height } = result.current;
        expect(width).toBe(100);
        expect(height).toBe(50);

        restore();
    });
});
