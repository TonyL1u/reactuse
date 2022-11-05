import { renderHook } from '@testing-library/react';
import { useThrottleFn } from 'reactuse';
import { sleep } from '../../../helper/testingUtils';

describe('useThrottleFn', () => {
    test('should be defined', () => {
        expect(useThrottleFn).toBeDefined();
    });

    test('should work', async () => {
        const fn = vi.fn();
        const { result } = renderHook(() => useThrottleFn(fn, 1000));
        const throttledFn = result.current;

        throttledFn();
        throttledFn();
        throttledFn();
        expect(fn).toBeCalledTimes(1);

        await sleep(500);
        throttledFn();
        expect(fn).toBeCalledTimes(1);

        await sleep(600);
        throttledFn();
        expect(fn).toBeCalledTimes(2);

        throttledFn.flush();
        throttledFn();
        expect(fn).toBeCalledTimes(3);

        throttledFn.cancel();
        throttledFn();
        expect(fn).toBeCalledTimes(4);
    });
});
