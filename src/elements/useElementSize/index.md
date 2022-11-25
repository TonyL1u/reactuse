# useElementSize

Reactive size of an HTML element. [`ResizeObserver MDN`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

## Usage

```ts
import { useRef } from 'react';
import { useElementSize } from 'reactuse';

const el = useRef<HTMLTextAreaElement | null>(null);
const size = useElementSize(el);
```

## Type Declarations

```ts
declare type ElementSize = {
    width: number;
    height: number;
};
declare function useElementSize<T extends MaybeElement>(target: MaybeElementRef<T>, options?: ResizeObserverOptions): ElementSize;
```

## Params

|  Name   |          Type           |                     Description                      | Optional |
| :-----: | :---------------------: | :--------------------------------------------------: | :------: |
| target  |  `MaybeElementRef<T>`   | DOM element or an HTML element wrapped by `useRef()` |  false   |
| options | `ResizeObserverOptions` |               ResizeObserver’s options               |   true   |

## Type Params

| Name |         Constraint         | Default Type |          Description          |
| :--: | :------------------------: | :----------: | :---------------------------: |
|  T   | `<T extends MaybeElement>` |      -       | Type of the real HTML element |
