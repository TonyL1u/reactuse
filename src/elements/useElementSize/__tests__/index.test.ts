import { renderHook, act } from '@testing-library/react';
import { useElementSize } from 'reactuse';

let callback: any;
function mockResizeObserver() {
    Object.defineProperty(global, 'ResizeObserver', {
        writable: true,
        value: vi.fn().mockImplementation(cb => {
            callback = cb;
            return {
                observe: vi.fn(),
                unobserve: vi.fn(),
                disconnect: vi.fn()
            };
        })
    });
}

describe('useElementSize', () => {
    beforeEach(() => {
        mockResizeObserver();
    });

    test('should be defined', () => {
        expect(useElementSize).toBeDefined();
    });

    test('should work', () => {
        const div = document.createElement('div');
        const target = { current: div };
        const { result } = renderHook(() => useElementSize(target));

        act(() => {
            callback([{ contentRect: { width: 100, height: 50 } }]);
        });

        expect(result.current).toMatchObject({ width: 100, height: 50 });
    });
});
