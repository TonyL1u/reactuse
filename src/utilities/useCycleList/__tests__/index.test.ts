import { renderHook, act } from '@testing-library/react';
import { useCycleList } from 'reactuse';

const listData = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'] as const;

describe('useCycleList', () => {
    test('should be defined', () => {
        expect(useCycleList).toBeDefined();
    });

    test('should work', () => {
        const { result } = renderHook(() => useCycleList(listData, { initialIndex: 1 }));

        expect(result.current.index).toBe(1);
        expect(result.current.current).toBe('Tues');

        act(result.current.next);
        expect(result.current.index).toBe(2);
        expect(result.current.current).toBe('Wed');

        act(() => result.current.next(5));
        expect(result.current.index).toBe(0);
        expect(result.current.current).toBe('Mon');

        act(result.current.prev);
        expect(result.current.index).toBe(6);
        expect(result.current.current).toBe('Sun');

        act(() => result.current.prev(2));
        expect(result.current.index).toBe(4);
        expect(result.current.current).toBe('Fri');

        act(() => result.current.seek(2));
        expect(result.current.index).toBe(2);
        expect(result.current.current).toBe('Wed');
    });
});
