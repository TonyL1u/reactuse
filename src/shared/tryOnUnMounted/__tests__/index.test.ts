import { renderHook } from '@testing-library/react';
import { tryOnUnmounted } from 'reactuse';

describe('tryOnUnmounted', () => {
    test('should be defined', () => {
        expect(tryOnUnmounted).toBeDefined();
    });

    test('should work', () => {
        const fn = vi.fn();
        const hook = renderHook(() => tryOnUnmounted(fn));
        expect(fn).toBeCalledTimes(0);

        hook.unmount();
        expect(fn).toBeCalledTimes(1);
    });
});
