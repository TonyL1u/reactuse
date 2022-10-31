import { useState } from 'react';
import { useResizeObserver } from '../useResizeObserver';
import { useEventListener } from '../../browser/useEventListener';
import type { MaybeElementRef, MaybeElement } from '../../helper';

type ElementBounding = { width: number; height: number; top: number; right: number; bottom: number; left: number; x: number; y: number };

export function useElementBounding<T extends MaybeElement = MaybeElement>(target: MaybeElementRef<T>) {
    const [bounding, setBounding] = useState<ElementBounding>({ width: NaN, height: NaN, top: NaN, right: NaN, bottom: NaN, left: NaN, x: NaN, y: NaN });

    const update = () => {
        const el = target && 'current' in target ? target.current : target;

        if (el) {
            const { width, height, top, right, bottom, left, x, y } = (el as HTMLElement).getBoundingClientRect();
            setBounding({ width, height, top, right, bottom, left, x, y });
        }
    };

    useResizeObserver(target, update);
    useEventListener('scroll', update, { passive: true });
    useEventListener('resize', update, { passive: true });

    return bounding;
}
