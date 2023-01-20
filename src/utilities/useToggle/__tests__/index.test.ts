import { renderHook, act } from '@testing-library/react';
import { useToggle } from 'reactuse';

describe('useToggle', () => {
    test('should be defined', () => {
        expect(useToggle).toBeDefined();
    });

    test('should work', () => {
        const { result } = renderHook(() => useToggle());

        expect(result.current[0]).toBe(false);

        act(result.current[1]);
        expect(result.current[0]).toBe(true);
    });

    test('should work with custom values', () => {
        const { result } = renderHook(() => useToggle('NO' as const, 'YES' as const));

        expect(result.current[0]).toBe('NO');

        act(result.current[1]);
        expect(result.current[0]).toBe('YES');

        act(() => result.current[1]('NO'));
        expect(result.current[0]).toBe('NO');
    });
});
