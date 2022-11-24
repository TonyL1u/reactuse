# useWindowSize

Reactive window size.

## Usage

```ts
import { useWindowSize } from 'reactuse';

const { width, height } = useWindowSize();
```

## Type Declarations

````ts
interface UseWindowSizeOptions {
    includeScrollbar?: boolean;
    initialHeight?: number;
    initialWidth?: number;
    listenOrientation?: boolean;
}
declare type WindowSize = {
    width: number;
    height: number;
};
/**
 * Reactive window size.
 *
 * @param options -
 *
 * @returns
 *
 * @example
 * ```ts
 * import { useWindowSize } from 'reactuse';
 *
 * const { width, height } = useWindowSize();
 * ```
 *
 */
declare function useWindowSize(options?: UseWindowSizeOptions): WindowSize;
````

## Params

|  Name   |          Type          | Description | Optional |
| :-----: | :--------------------: | :---------: | :------: |
| options | `UseWindowSizeOptions` |      -      |   true   |
