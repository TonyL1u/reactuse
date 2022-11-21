# useWindowSize

Reactive window size.

## Usage

```ts
import { useWindowSize } from 'reactuse';

const { width, height } = useWindowSize();
```

## Type Declarations

````ts
/** @public */
export declare type WindowSize = {
    width: number;
    height: number;
};
/** @public */
export interface UseWindowSizeOptions {
    initialWidth?: number;
    initialHeight?: number;
    listenOrientation?: boolean;
    includeScrollbar?: boolean;
}
/**
 * Reactive window size.
 *
 * @example
 * ```ts
 * import { useWindowSize } from 'reactuse';
 *
 * const { width, height } = useWindowSize();
 * ```
 * @param options -
 * @returns
 * @public
 */
export declare function useWindowSize(options?: UseWindowSizeOptions): WindowSize;
````

## Params

|  Name   |          Type          | Description | Optional |
| :-----: | :--------------------: | :---------: | :------: |
| options | `UseWindowSizeOptions` |      -      |   true   |
