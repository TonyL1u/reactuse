import { useState } from 'react';
import { useSupported } from '../../shared';
import { useEventListener } from '../../browser';

/** @public */
export interface DeviceOrientationState {
    isAbsolute: boolean;
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
}
/** @public */
export interface UseDeviceOrientationReturn extends DeviceOrientationState {
    isSupported: boolean;
}
/**
 * Reactive [`DeviceOrientationEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent). Provide web developers with information from the physical orientation of the device running the web page.
 *
 * @example
 * ```ts
 * import { useDeviceOrientation } from 'reactuse';
 *
 * const { isAbsolute, alpha, beta, gamma } = useDeviceOrientation();
 * ```
 * @returns
 * @public
 */
export function useDeviceOrientation(): UseDeviceOrientationReturn {
    const [orientationState, setOrientationState] = useState<DeviceOrientationState>({ isAbsolute: false, alpha: null, beta: null, gamma: null });
    const isSupported = useSupported(() => window && 'DeviceOrientationEvent' in window);

    if (isSupported) {
        useEventListener('deviceorientation', event => {
            const { absolute, alpha, beta, gamma } = event;
            setOrientationState({ isAbsolute: absolute, alpha, beta, gamma });
        });
    }

    return { isSupported, ...orientationState };
}
