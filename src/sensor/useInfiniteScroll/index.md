# useInfiniteScroll

Infinite scrolling of the element.

## Usage

```ts
import { useInfiniteScroll } from 'reactuse';

const el = useRef<HTMLDivElement>(null);
useInfiniteScroll(el, () => {
    // load more method
});
```

## Type Declarations

```ts
interface UseScrollReturn {
    arrivedState: ArrivedState;
    isScrolling: boolean;
    x: number;
    y: number;
}
interface ArrivedState {
    bottom: boolean;
    left: boolean;
    right: boolean;
    top: boolean;
}
interface UseInfiniteScrollOptions extends UseScrollOptions {
    /**
     * The direction in which to listen the scroll.
     *
     * @defaultValue 'bottom'
     */
    direction?: 'top' | 'bottom' | 'left' | 'right';
    /**
     * The minimum distance between the bottom of the element and the bottom of the viewport
     *
     * @defaultValue 0
     */
    distance?: number;
}
declare function useInfiniteScroll<T extends MaybeElement>(element: MaybeElementRef<T>, onLoadMore?: (state: UseScrollReturn) => void | Promise<void>, options?: UseInfiniteScrollOptions): void;
```

## Params

|    Name    |                        Type                         |      Description      | Optional |
| :--------: | :-------------------------------------------------: | :-------------------: | :------: |
|  element   |                `MaybeElementRef<T>`                 | The scrolling element |  false   |
| onLoadMore | `(state: UseScrollReturn) => void \| Promise<void>` |   Load more method    |   true   |
|  options   |             `UseInfiniteScrollOptions`              |           -           |   true   |

## Type Params

| Name |         Constraint         | Default Type | Description |
| :--: | :------------------------: | :----------: | :---------: |
|  T   | `<T extends MaybeElement>` |      -       |             |
