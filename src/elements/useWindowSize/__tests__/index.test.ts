import { renderHook, fireEvent } from '@testing-library/react';
import { useWindowSize } from 'reactuse';

describe('useWindowSize', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

    beforeEach(() => {
        addEventListenerSpy.mockReset();
    });

    afterAll(() => {
        addEventListenerSpy.mockRestore();
    });

    test('should be defined', () => {
        expect(useWindowSize).toBeDefined();
    });

    test('should work', () => {
        const { result } = renderHook(() => useWindowSize({ initialWidth: 200, initialHeight: 100 }));

        expect(result.current).toMatchObject({ width: window.innerWidth, height: window.innerHeight });
    });

    test('should exclude scrollbar', () => {
        const { result } = renderHook(() => useWindowSize({ initialWidth: 200, initialHeight: 100, includeScrollbar: false }));

        expect(result.current).toMatchObject({
            width: window.document.documentElement.clientWidth,
            height: window.document.documentElement.clientHeight
        });
    });

    test('should work when trigger window "resize" event', () => {
        renderHook(() => useWindowSize({ initialWidth: 200, initialHeight: 100, listenOrientation: false }));
        expect(addEventListenerSpy).toHaveBeenCalledOnce();

        const [event, _, options] = addEventListenerSpy.mock.calls[0];
        expect(event).toEqual('resize');
        expect(options).toEqual({ passive: true });
    });

    test('should work when trigger window "orientationchange" event', () => {
        renderHook(() => useWindowSize({ initialWidth: 200, initialHeight: 100 }));
        expect(addEventListenerSpy).toHaveBeenCalledTimes(2);

        const [event, _, options] = addEventListenerSpy.mock.calls[1];
        expect(event).toEqual('orientationchange');
        expect(options).toEqual({ passive: true });
    });
});
