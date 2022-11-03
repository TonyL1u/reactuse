import { renderHook } from '@testing-library/react';
import { tryOnMounted } from 'reactuse';

describe('tryOnMounted', () => {
    test('should be defined', () => {
        expect(tryOnMounted).toBeDefined();
    });

    test('should work', () => {
        const fn = vi.fn();
        const hook = renderHook(() => tryOnMounted(fn));
        expect(fn).toBeCalledTimes(1);

        hook.rerender();
        expect(fn).toBeCalledTimes(1);

        hook.unmount();
        expect(fn).toBeCalledTimes(1);

        renderHook(() => tryOnMounted(fn));
        expect(fn).toBeCalledTimes(2);
    });
});
