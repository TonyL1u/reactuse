import { renderHook, act } from '@testing-library/react';
import { useClamp } from 'reactuse';

const MIN = 0;
const MAX = 10;

describe('useClamp', () => {
    test('should be defined', () => {
        expect(useClamp).toBeDefined();
    });

    test('should work', () => {
        const { result } = renderHook(() => useClamp(0, MIN, MAX));

        expect(result.current[0]).toBe(0);

        act(() => result.current[1](5));
        expect(result.current[0]).toBe(5);

        act(() => result.current[1](-1));
        expect(result.current[0]).toBe(0);

        act(() => result.current[1](20));
        expect(result.current[0]).toBe(10);
    });
});
