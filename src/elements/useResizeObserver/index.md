# useResizeObserver

Reports changes to the dimensions of an Element's content or the border-box.

## Usage

```ts
import { useRef } from 'react';
import { useResizeObserver } from 'reactuse';

const target = useRef<HTMLDivElement>(null);
useResizeObserver(target, ([entry]) => {
    // ...
});
```

## Type Declarations

````ts
/**
 * Reports changes to the dimensions of an Element's content or the border-box.
 *
 * @example
 * ```ts
 * import { useRef } from 'react';
 * import { useResizeObserver } from 'reactuse';
 *
 * const target = useRef<HTMLDivElement>(null);
 * useResizeObserver(target, ([entry]) => {
 *     // ...
 * })
 * ```
 * @param target - DOM element or an HTML element wrapped by `useRef()`
 * @param callback - ResizeObserver’s callback
 * @param options - ResizeObserver’s options
 * @returns
 * @public
 */
export declare function useResizeObserver<T extends MaybeElement>(
    target: MaybeElementRef<T>,
    callback: ResizeObserverCallback,
    options?: ResizeObserverOptions
): {
    isSupported: any;
    stop: () => void;
};
````

## Params

|   Name   |           Type           |                     Description                      | Optional |
| :------: | :----------------------: | :--------------------------------------------------: | :------: |
|  target  |   `MaybeElementRef<T>`   | DOM element or an HTML element wrapped by `useRef()` |  false   |
| callback | `ResizeObserverCallback` |              ResizeObserver’s callback               |  false   |
| options  | `ResizeObserverOptions`  |               ResizeObserver’s options               |   true   |

## Type Params

| Name |         Constraint         | Default Type | Description |
| :--: | :------------------------: | :----------: | :---------: |
|  T   | `<T extends MaybeElement>` |      -       |             |
