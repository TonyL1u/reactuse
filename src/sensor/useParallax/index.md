# useParallax

Create parallax effect easily. It uses `useDeviceOrientation` and fallback to `useMouse` if orientation is not supported.

## Usage

```ts
import { useParallax } from 'reactuse';

const el = useRef<HTMLDivElement | null>(null);
const { roll, tilt } = useParallax(el);
```

## Type Declarations

```ts
interface UseParallaxOptions {
    deviceOrientationRollAdjust?: (i: number) => number;
    deviceOrientationTiltAdjust?: (i: number) => number;
    mouseRollAdjust?: (i: number) => number;
    mouseTiltAdjust?: (i: number) => number;
}
declare function useParallax<T extends MaybeElement = MaybeElement>(
    target: MaybeElementRef<T>,
    options?: UseParallaxOptions
): {
    roll: number;
    tilt: number;
    source: string;
};
```

## Params

|  Name   |         Type         |                     Description                      | Optional |
| :-----: | :------------------: | :--------------------------------------------------: | :------: |
| target  | `MaybeElementRef<T>` | DOM element or an HTML element wrapped by `useRef()` |  false   |
| options | `UseParallaxOptions` |                          -                           |   true   |

## Type Params

| Name |         Constraint         |  Default Type  |          Description          |
| :--: | :------------------------: | :------------: | :---------------------------: |
|  T   | `<T extends MaybeElement>` | `MaybeElement` | Type of the real HTML element |
