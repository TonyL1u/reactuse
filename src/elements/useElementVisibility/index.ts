import { useState } from 'react';
import { useWindowSize } from '../useWindowSize';
import { useElementBounding } from '../useElementBounding';
import { useWatchState } from '../../shared/useWatchState';
import type { MaybeElementRef, MaybeElement } from '../../helper';

/**
 * Tracks the visibility of an element within the viewport.
 *
 * @example
 * ```ts
 * import { useRef } from 'react';
 * import { useElementVisibility } from 'reactuse';
 * 
 * const el = useRef<HTMLDivElement>(null);
 * // visible is expected to be `false` when element is out of the viewport
 * const visible = useElementVisibility();
 * ```
 * @param target -
 * @typeParam T - 
 * 
 */
export function useElementVisibility<T extends MaybeElement>(target: MaybeElementRef<T>) {
    const [visible, setVisible] = useState(false);
    const { top, height: elHeight, left, width: elWidth } = useElementBounding(target);
    const { width, height } = useWindowSize();

    useWatchState([top, elHeight, left, elWidth, width, height], () => {
        setVisible(top >= -elHeight && top <= height && left >= -elWidth && left <= width);
    });

    return visible;
}
