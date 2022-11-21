import { renderHook } from '@testing-library/react';
import { useOnUnmounted } from 'reactuse';

describe('useOnUnmounted', () => {
    test('should be defined', () => {
        expect(useOnUnmounted).toBeDefined();
    });

    test('should work', () => {
        const fn = vi.fn();
        const hook = renderHook(() => useOnUnmounted(fn));
        expect(fn).toBeCalledTimes(0);

        hook.unmount();
        expect(fn).toBeCalledTimes(1);
    });
});
