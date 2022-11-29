import { useMemo } from 'react';
import { useDeviceOrientation } from '../useDeviceOrientation';
import { useElementSize } from '../../elements/useElementSize';
import { useMouseInElement } from '../../elements/useMouseInElement';
import type { MaybeElementRef, MaybeElement } from '../../helper';

export interface UseParallaxOptions {
    deviceOrientationTiltAdjust?: (i: number) => number;
    deviceOrientationRollAdjust?: (i: number) => number;
    mouseTiltAdjust?: (i: number) => number;
    mouseRollAdjust?: (i: number) => number;
}
/**
 * Create parallax effect easily. It uses `useDeviceOrientation` and fallback to `useMouse` if orientation is not supported.
 *
 * @example
 * ```ts
 * import { useParallax } from 'reactuse';
 *
 * const el = useRef<HTMLDivElement | null>(null);
 * const { roll, tilt } = useParallax(el);
 * ```
 * @param target - DOM element or an HTML element wrapped by `useRef()`
 * @param options -
 * @typeParam T - Type of the real HTML element
 * @returns
 * 
 */
export function useParallax<T extends Exclude<MaybeElement, Window | Document>>(target: MaybeElementRef<T>, options: UseParallaxOptions = {}) {
    const { deviceOrientationTiltAdjust = i => i, deviceOrientationRollAdjust = i => i, mouseTiltAdjust = i => i, mouseRollAdjust = i => i } = options;
    const { isSupported, alpha, gamma, beta } = useDeviceOrientation();
    const { width, height } = useElementSize(target);
    const { x, y } = useMouseInElement(target);

    const source = useMemo(() => {
        if (isSupported && ((alpha !== null && alpha !== 0) || (gamma !== null && gamma !== 0))) return 'deviceOrientation';
        return 'mouse';
    }, [isSupported, alpha, gamma]);

    const roll = useMemo(() => {
        if (source === 'deviceOrientation') {
            return deviceOrientationRollAdjust(-beta! / 90);
        } else {
            return mouseRollAdjust(-(y - height / 2) / height);
        }
    }, [source, beta, y, height, deviceOrientationRollAdjust, mouseRollAdjust]);

    const tilt = useMemo(() => {
        if (source === 'deviceOrientation') {
            return deviceOrientationTiltAdjust(gamma! / 90);
        } else {
            return mouseTiltAdjust((x - width / 2) / width);
        }
    }, [source, gamma, x, width, deviceOrientationTiltAdjust, mouseTiltAdjust]);

    return { roll, tilt, source };
}
