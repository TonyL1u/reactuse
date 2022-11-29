# useMutationObserver

Watch for changes being made to the DOM tree. [`MutationObserver MDN`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).

## Usage

```ts
import { useState, useRef } from 'react';
import { useMutationObserver } from 'reactuse';

const el = useRef<HTMLDivElement>(null);
useMutationObserver(el, mutations => {
    // ...
});
```

## Type Declarations

```ts
interface UseMutationObserverReturn {
    isSupported: boolean;
    /**
     * To stop the observation manually
     */
    stop: () => void;
}
declare function useMutationObserver<T extends Exclude<MaybeElement, Window | Document>>(target: MaybeElementRef<T>, callback: MutationCallback, options?: MutationObserverInit): UseMutationObserverReturn;
```

## Params

|   Name   |          Type          |                     Description                      | Optional |
| :------: | :--------------------: | :--------------------------------------------------: | :------: |
|  target  |  `MaybeElementRef<T>`  | DOM element or an HTML element wrapped by `useRef()` |  false   |
| callback |   `MutationCallback`   |             MutationObserver's callback              |  false   |
| options  | `MutationObserverInit` |              MutationObserver's options              |   true   |

## Type Params

| Name |                       Constraint                        | Default Type |          Description          |
| :--: | :-----------------------------------------------------: | :----------: | :---------------------------: |
|  T   | `<T extends Exclude<MaybeElement, Window \| Document>>` |      -       | Type of the real HTML element |
