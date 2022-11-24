# useDeviceOrientation

Reactive [`DeviceOrientationEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent). Provide web developers with information from the physical orientation of the device running the web page.

## Usage

```ts
import { useDeviceOrientation } from 'reactuse';

const { isAbsolute, alpha, beta, gamma } = useDeviceOrientation();
```

## Type Declarations

````ts
interface UseDeviceOrientationReturn extends DeviceOrientationState {
    isSupported: boolean;
}
/**
 * Reactive [`DeviceOrientationEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent). Provide web developers with information from the physical orientation of the device running the web page.
 *
 * @returns
 *
 * @example
 * ```ts
 * import { useDeviceOrientation } from 'reactuse';
 *
 * const { isAbsolute, alpha, beta, gamma } = useDeviceOrientation();
 * ```
 *
 */
declare function useDeviceOrientation(): UseDeviceOrientationReturn;
````
