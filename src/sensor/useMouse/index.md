# useMouse

Reactive mouse position.

## Usage

```ts
import { useMouse } from 'reactuse';

const { x, y, sourceType } = useMouse();
```

## Type Declarations

````ts
import type { ConfigurableEventFilter } from '../../helper';
/** @public */
export declare type CursorState = {
    x: number;
    y: number;
};
/** @public */
export declare type MouseSourceType = 'mouse' | 'touch' | null;
/** @public */
export interface UseMouseOptions extends ConfigurableEventFilter {
    /**
     * Mouse position based by page or client
     *
     * @defaultValue 'page'
     */
    type?: 'page' | 'client';
    /**
     * Listen to `touchmove` events
     *
     * @defaultValue true
     */
    touch?: boolean;
    /**
     * Initial values
     */
    initialValue?: CursorState;
}
/**
 * Reactive mouse position.
 *
 * @example
 * ```ts
 * import { useMouse } from 'reactuse';
 *
 * const { x, y, sourceType } = useMouse();
 * ```
 * @param options -
 * @returns Your cursor's position
 * @public
 */
export declare function useMouse(options?: UseMouseOptions): {
    sourceType: MouseSourceType;
    x: number;
    y: number;
};
````

## Params

|  Name   |       Type        | Description | Optional |
| :-----: | :---------------: | :---------: | :------: |
| options | `UseMouseOptions` |      -      |   true   |
