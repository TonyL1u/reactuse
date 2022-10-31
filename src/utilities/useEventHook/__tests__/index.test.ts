import { renderHook } from '@testing-library/react';
import { useEventHook } from 'reactuse';

describe('useEventHook', () => {
    test('should be defined', () => {
        expect(useEventHook).toBeDefined();
    });

    test('should work', () => {
        const fn = vi.fn();
        const { result } = renderHook(() => useEventHook());
        const { on, trigger, off } = result.current;

        on(fn);
        trigger(fn);
        trigger(fn);
        expect(fn).toBeCalledTimes(2);

        off(fn);
        trigger(fn);
        expect(fn).toBeCalledTimes(2);
    });
});
