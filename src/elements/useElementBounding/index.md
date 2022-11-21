# useElementBounding

Reactive [bounding box](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) of an HTML element.

## Usage

```ts
import { useRef } from 'react';
import { useElementBounding } from 'reactuse';

const el = useRef<HTMLTextAreaElement | null>(null);
const bounding = useElementBounding(el);
```

## Type Declarations

````ts
import type { MaybeElementRef, MaybeElement } from '../../helper';
/** @public */
export declare type ElementBounding = {
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
    x: number;
    y: number;
};
/**
 * Reactive [bounding box](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) of an HTML element.
 *
 * @example
 * ```ts
 * import { useRef } from 'react';
 * import { useElementBounding } from 'reactuse';
 *
 * const el = useRef<HTMLTextAreaElement | null>(null);
 * const bounding = useElementBounding(el);
 * ```
 * @param target - DOM element or an HTML element wrapped by `useRef()`
 * @typeParam T - Type of the real HTML element
 * @returns Bounding of the element
 * @public
 */
export declare function useElementBounding<T extends MaybeElement = MaybeElement>(target: MaybeElementRef<T>): ElementBounding;
````

## Params

|  Name  |         Type         |                     Description                      | Optional |
| :----: | :------------------: | :--------------------------------------------------: | :------: |
| target | `MaybeElementRef<T>` | DOM element or an HTML element wrapped by `useRef()` |  false   |

## Type Params

| Name |         Constraint         |  Default Type  |          Description          |
| :--: | :------------------------: | :------------: | :---------------------------: |
|  T   | `<T extends MaybeElement>` | `MaybeElement` | Type of the real HTML element |
