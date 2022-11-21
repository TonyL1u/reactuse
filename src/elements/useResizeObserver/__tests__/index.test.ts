import { renderHook, act } from '@testing-library/react';
import { useResizeObserver } from 'reactuse';
import { mockResizeObserver } from '../../../helper/testingUtils';

describe('useResizeObserver', () => {
    let callback: any;
    beforeEach(() => {
        mockResizeObserver(cb => callback = cb);
    });

    test('should be defined', () => {
        expect(useResizeObserver).toBeDefined();
    });

    test('should work', () => {
        const fn = vi.fn();
        const div = document.createElement('div');
        renderHook(() => useResizeObserver(div, fn));

        act(callback);

        expect(fn).toBeCalledTimes(1);
    });
});
