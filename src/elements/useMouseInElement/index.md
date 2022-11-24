# useMouseInElement

Reactive mouse position related to an element.

## Usage

```ts
import { useMouseInElement } from 'reactuse';

const { x, y, isOutside } = useMouseInElement(el);
```

## Type Declarations

````ts
interface UseMouseInElementOptions extends UseMouseOptions {}
/**
 * Reactive mouse position related to an element.
 *
 * @param target - DOM element or an HTML element wrapped by `useRef()`
 *
 * @param options -
 *
 * @typeParam T - Type of the real HTML element
 *
 * @returns
 *
 * @example
 * ```ts
 * import { useMouseInElement } from 'reactuse';
 *
 * const { x, y, isOutside } = useMouseInElement(el);
 * ```
 *
 */
declare function useMouseInElement<T extends MaybeElement = MaybeElement>(
    target: MaybeElementRef<T>,
    options?: UseMouseInElementOptions
): {
    x: number;
    y: number;
    isOutside: boolean;
};
````

## Params

|  Name   |            Type            |                     Description                      | Optional |
| :-----: | :------------------------: | :--------------------------------------------------: | :------: |
| target  |    `MaybeElementRef<T>`    | DOM element or an HTML element wrapped by `useRef()` |  false   |
| options | `UseMouseInElementOptions` |                          -                           |   true   |

## Type Params

| Name |         Constraint         |  Default Type  |          Description          |
| :--: | :------------------------: | :------------: | :---------------------------: |
|  T   | `<T extends MaybeElement>` | `MaybeElement` | Type of the real HTML element |
