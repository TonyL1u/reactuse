import { useState } from 'react';
import { useResizeObserver } from '../useResizeObserver';
import type { MaybeElementRef, MaybeElement } from '../../helper';

/** @public */
export type ElementSize = {
    width: number;
    height: number;
};
/**
 * Reactive size of an HTML element. [ResizeObserver MDN](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).
 *
 * @example
 * ```ts
 * import { useRef } from 'react';
 * import { useElementSize } from 'reactuse';
 *
 * const el = useRef<HTMLTextAreaElement | null>(null);
 * const size = useElementSize(el);
 * ```
 * @param target - DOM element or an HTML element wrapped by `useRef()`
 * @param options - ResizeObserver’s options
 * @typeParam T - Type of the real HTML element
 * @returns Size of the element
 * @public
 */
export function useElementSize<T extends MaybeElement>(target: MaybeElementRef<T>, options: ResizeObserverOptions = {}) {
    const { box = 'content-box' } = options;
    const [size, setSize] = useState<ElementSize>({ width: NaN, height: NaN });

    useResizeObserver(
        target,
        ([entry]) => {
            const boxSize = box === 'border-box' ? entry.borderBoxSize : box === 'content-box' ? entry.contentBoxSize : entry.devicePixelContentBoxSize;
            if (boxSize) {
                setSize({
                    width: boxSize.reduce((acc, { inlineSize }) => acc + inlineSize, 0),
                    height: boxSize.reduce((acc, { blockSize }) => acc + blockSize, 0)
                });
            } else {
                const { width, height } = entry.contentRect;
                setSize({ width, height });
            }
        },
        options
    );

    return size;
}
