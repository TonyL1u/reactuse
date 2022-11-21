import { renderHook } from '@testing-library/react';
import { useMutationObserver } from 'reactuse';

describe('useMutationObserver', () => {
    test('should be defined', () => {
        expect(useMutationObserver).toBeDefined();
    });

    test('should work when attribute changed', async () => {
        const fn = vi.fn();
        const div = document.createElement('div');

        const { rerender } = renderHook(() => useMutationObserver(div, fn, { attributes: true }));
        div.style.background = 'green';
        await rerender();
        expect(fn).toBeCalled();
    });

    test('should work when dom structure changed', async () => {
        const fn = vi.fn();
        const parent = document.createElement('div');
        const child = document.createElement('div');
        parent.appendChild(child);
    
        const { rerender } = renderHook(() => useMutationObserver(parent, fn, { childList: true }));
        parent.removeChild(child);
        await rerender();
        expect(fn).toBeCalled();
    })
});
