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

```ts
interface UseResizeObserverReturn {
    isSupported: boolean;
    /**
     * To stop the observation manually
     */
    stop: () => void;
}
declare function useResizeObserver<T extends MaybeElement>(target: MaybeElementRef<T>, callback: ResizeObserverCallback, options?: ResizeObserverOptions): UseResizeObserverReturn;
```

## Params

|   Name   |           Type           |                     Description                      | Optional |
| :------: | :----------------------: | :--------------------------------------------------: | :------: |
|  target  |   `MaybeElementRef<T>`   | DOM element or an HTML element wrapped by `useRef()` |  false   |
| callback | `ResizeObserverCallback` |              ResizeObserver’s callback               |  false   |
| options  | `ResizeObserverOptions`  |               ResizeObserver’s options               |   true   |

## Type Params

| Name |         Constraint         | Default Type |          Description          |
| :--: | :------------------------: | :----------: | :---------------------------: |
|  T   | `<T extends MaybeElement>` |      -       | Type of the real HTML element |
