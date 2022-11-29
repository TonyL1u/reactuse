import { useMemo } from 'react';
import { useMouse } from '../../sensor/useMouse';
import { useElementBounding } from '../useElementBounding';
import type { UseMouseOptions, UseMouseReturn } from '../../sensor/useMouse';
import type { MaybeElementRef, MaybeElement } from '../../helper';

export interface UseMouseInElementOptions extends UseMouseOptions {}
export interface UseMouseInElementReturn extends UseMouseReturn {
    isOutside: boolean;
}
/**
 * Reactive mouse position related to an element.
 *
 * @example
 * ```ts
 * import { useMouseInElement } from 'reactuse';
 *
 * const { x, y, isOutside } = useMouseInElement(el);
 * ```
 * @param target - DOM element or an HTML element wrapped by `useRef()`
 * @param options -
 * @typeParam T - Type of the real HTML element
 * @returns
 *
 */
export function useMouseInElement<T extends Exclude<MaybeElement, Window | Document>>(target: MaybeElementRef<T>, options: UseMouseInElementOptions = {}): UseMouseInElementReturn {
    const { x, y, sourceType } = useMouse(options);
    const { top, left, width, height } = useElementBounding(target);

    const elementX = useMemo(() => x - left, [x, left]);
    const elementY = useMemo(() => y - top, [y, top]);
    const isOutside = useMemo(() => width === 0 || height === 0 || elementX < 0 || elementY < 0 || elementX > width || elementY > height || isNaN(elementX) || isNaN(elementY), [width, height, elementX, elementY]);

    return { x: elementX, y: elementY, sourceType, isOutside };
}
