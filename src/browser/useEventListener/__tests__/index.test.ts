import { renderHook, fireEvent } from '@testing-library/react';
import { useEventListener } from 'reactuse';

describe('useEventListener', () => {
    test('should be defined', () => {
        expect(useEventListener).toBeDefined();
    });

    test('should work', () => {
        const fn = vi.fn();
        const hook = renderHook(() => useEventListener('click', fn));

        fireEvent.click(window);
        expect(fn).toBeCalledTimes(1);

        hook.unmount();
        fireEvent.click(window);
        expect(fn).toBeCalledTimes(1);
    });

    test('should work with specify target', () => {
        const fn = vi.fn();
        const div = document.createElement('div');
        const target = { current: div };

        renderHook(() => useEventListener(target, 'mouseenter', fn));

        fireEvent.mouseEnter(div);
        expect(fn).toBeCalled();
    });

    test('should manually stop listening event', () => {
        const fn = vi.fn();
        const { result } = renderHook(() => useEventListener('click', fn));
        const stop = result.current;

        fireEvent.click(window);
        expect(fn).toBeCalledTimes(1);

        stop();
        fireEvent.click(window);
        expect(fn).toBeCalledTimes(1);
    });
});
