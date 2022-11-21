import { renderHook } from '@testing-library/react';
import { useMounted } from 'reactuse';

describe('useMounted', () => {
    test('should be defined', () => {
        expect(useMounted).toBeDefined();
    });

    test('should work', () => {
        const { result } = renderHook(() => useMounted());

        expect(result.current).toBe(true);
    });
});
