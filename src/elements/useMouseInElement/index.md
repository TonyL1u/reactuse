# useMouseInElement

Reactive mouse position related to an element.

## Usage

```ts
import { useMouseInElement } from 'reactuse';

const { x, y, isOutside } = useMouseInElement(el);
```

## Type Declarations

```ts
interface UseMouseInElementOptions extends UseMouseOptions {}
interface UseMouseInElementReturn extends UseMouseReturn {
    isOutside: boolean;
}
declare function useMouseInElement<T extends Exclude<MaybeElement, Window | Document>>(target: MaybeElementRef<T>, options?: UseMouseInElementOptions): UseMouseInElementReturn;
```

## Params

|  Name   |            Type            |                     Description                      | Optional |
| :-----: | :------------------------: | :--------------------------------------------------: | :------: |
| target  |    `MaybeElementRef<T>`    | DOM element or an HTML element wrapped by `useRef()` |  false   |
| options | `UseMouseInElementOptions` |                          -                           |   true   |

## Type Params

| Name |                       Constraint                        | Default Type |          Description          |
| :--: | :-----------------------------------------------------: | :----------: | :---------------------------: |
|  T   | `<T extends Exclude<MaybeElement, Window \| Document>>` |      -       | Type of the real HTML element |
