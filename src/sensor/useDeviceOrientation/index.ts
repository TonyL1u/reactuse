import { useState } from 'react';
import { useSupported } from '../../shared';
import { useEventListener } from '../../browser';

interface DeviceOrientationState {
    isAbsolute: boolean;
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
}

export function useDeviceOrientation() {
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
