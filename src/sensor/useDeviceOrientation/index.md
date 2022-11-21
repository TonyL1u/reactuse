# useDeviceOrientation

Reactive [DeviceOrientationEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent). Provide web developers with information from the physical orientation of the device running the web page.

## Usage

```ts
import { useDeviceOrientation } from 'reactuse';

const { isAbsolute, alpha, beta, gamma } = useDeviceOrientation();
```

## Type Declarations

````ts
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
 * Reactive [DeviceOrientationEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent). Provide web developers with information from the physical orientation of the device running the web page.
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
export declare function useDeviceOrientation(): UseDeviceOrientationReturn;
````
