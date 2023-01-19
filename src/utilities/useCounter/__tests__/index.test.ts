import { renderHook, act } from '@testing-library/react';
import { useCounter } from 'reactuse';

describe('useCounter', () => {
    test('should be defined', () => {
        expect(useCounter).toBeDefined();
    });

    test('should work', () => {
        const { result } = renderHook(() => useCounter());

        expect(result.current.count).toBe(0);

        act(result.current.inc);
        expect(result.current.count).toBe(1);

        act(() => result.current.inc(2));
        expect(result.current.count).toBe(3);

        act(result.current.dec);
        expect(result.current.count).toBe(2);

        act(() => result.current.dec(3));
        expect(result.current.count).toBe(-1);

        act(() => result.current.set(10));
        expect(result.current.count).toBe(10);

        act(result.current.reset);
        expect(result.current.count).toBe(0);
    });

    test('should work with min & max props', () => {
        const { result } = renderHook(() => useCounter(5, { min: -5, max: 10 }));

        expect(result.current.count).toBe(5);

        act(() => result.current.inc(10));
        expect(result.current.count).toBe(10);

        act(() => result.current.dec(20));
        expect(result.current.count).toBe(-5);

        act(() => result.current.set(20));
        expect(result.current.count).toBe(10);

        act(() => result.current.set(-10));
        expect(result.current.count).toBe(-5);
    });
});
