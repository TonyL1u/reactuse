import { useMemo } from 'react';
import { useMouse } from '../../sensor';
import { useElementBounding } from '../useElementBounding';
import type { UseMouseOptions } from '../../sensor';
import type { MaybeElementRef, MaybeElement } from '../../helper';

interface UseMouseInElementOptions extends UseMouseOptions {}

export function useMouseInElement<T extends MaybeElement = MaybeElement>(target: MaybeElementRef<T>, options: UseMouseInElementOptions = {}) {
    const { x, y } = useMouse();
    const { top, left, width, height } = useElementBounding(target);

    const elementX = useMemo(() => x - left, [x, left]);
    const elementY = useMemo(() => y - top, [y, top]);
    const isOutside = useMemo(() => width === 0 || height === 0 || elementX < 0 || elementY < 0 || elementX > width || elementY > height || isNaN(elementX) || isNaN(elementY), [width, height, elementX, elementY]);

    return { x: elementX, y: elementY, isOutside };
}
