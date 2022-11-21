import { renderHook } from '@testing-library/react';
import { useOnMounted } from 'reactuse';

describe('useOnMounted', () => {
    test('should be defined', () => {
        expect(useOnMounted).toBeDefined();
    });

    test('should work', () => {
        const fn = vi.fn();
        const hook = renderHook(() => useOnMounted(fn));
        expect(fn).toBeCalledTimes(1);

        hook.rerender();
        expect(fn).toBeCalledTimes(1);

        hook.unmount();
        expect(fn).toBeCalledTimes(1);

        renderHook(() => useOnMounted(fn));
        expect(fn).toBeCalledTimes(2);
    });
});
