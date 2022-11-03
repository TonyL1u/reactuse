import { useState } from 'react';
import { useResizeObserver } from '../useResizeObserver';
import type { MaybeElementRef, MaybeElement } from '../../helper';

type ElementSize = { width: number; height: number };

export function useElementSize<T extends MaybeElement = MaybeElement>(target: MaybeElementRef<T>, options: ResizeObserverOptions = {}) {
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
