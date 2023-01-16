import { useState } from 'react';
import { useSupported } from '../../shared/useSupported';
import { useEventListener } from '../../browser/useEventListener';

export interface DeviceOrientationState {
    isAbsolute: boolean;
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
}

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
 *
 */
export function useDeviceOrientation(): UseDeviceOrientationReturn {
    const [orientationState, setOrientationState] = useState<DeviceOrientationState>({ isAbsolute: false, alpha: null, beta: null, gamma: null });
    const isSupported = useSupported(() => window && 'DeviceOrientationEvent' in window);

    useEventListener('deviceorientation', event => {
        if (!isSupported) return;

        const { absolute, alpha, beta, gamma } = event;
        setOrientationState({ isAbsolute: absolute, alpha, beta, gamma });
    });

    return { isSupported, ...orientationState };
}
