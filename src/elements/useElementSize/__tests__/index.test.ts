import { renderHook, act } from '@testing-library/react';
import { useElementSize } from 'reactuse';
import { mockResizeObserver } from '../../../helper/testingUtils';

describe('useElementSize', () => {
    let callback: any;
    beforeEach(() => {
        mockResizeObserver(cb => callback = cb);
    });

    test('should be defined', () => {
        expect(useElementSize).toBeDefined();
    });

    test('should work', () => {
        const div = document.createElement('div');
        const { result } = renderHook(() => useElementSize(div));

        act(() => {
            callback([{ contentRect: { width: 100, height: 50 } }]);
        });

        expect(result.current).toMatchObject({ width: 100, height: 50 });
    });
});
