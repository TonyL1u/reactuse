import { useState } from 'react';
import { useResizeObserver } from '../useResizeObserver';
import { useEventListener } from '../../browser/useEventListener';
import { getTargetElement } from '../../helper';
import type { MaybeElementRef, MaybeElement } from '../../helper';


export type ElementBounding = {
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
    x: number;
    y: number;
};
/**
 * Reactive [`bounding box`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) of an HTML element.
 *
 * @example
 * ```ts
 * import { useRef } from 'react';
 * import { useElementBounding } from 'reactuse';
 *
 * const el = useRef<HTMLTextAreaElement | null>(null);
 * const bounding = useElementBounding(el);
 * ```
 * @param target - DOM element or an HTML element wrapped by `useRef()`
 * @typeParam T - Type of the real HTML element
 * @returns Bounding of the element
 * 
 */
export function useElementBounding<T extends Exclude<MaybeElement, Window | Document>>(target: MaybeElementRef<T>) {
    const [bounding, setBounding] = useState<ElementBounding>({ width: NaN, height: NaN, top: NaN, right: NaN, bottom: NaN, left: NaN, x: NaN, y: NaN });

    const update = () => {
        const el = getTargetElement(target);
       
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
