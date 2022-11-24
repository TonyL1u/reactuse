# useWatchState

Watch a state value. Idea from Vue `watch` function.

## Usage

```ts
import { useState, useEffect } from 'react';
import { useWatchState } from 'reactuse';

const [count, setCount] = useState(0);
useWatchState(count, val => {
    // ...
});

// it's equal to
useEffect(() => {
    // ...
}, [count]);
```

## Type Declarations

````ts
declare type WatchStateCallback<V = any, OV = any> = (value: V, oldValue: OV) => any;
interface WatchStateOptions extends ConfigurableEventFilter {
    immediate?: boolean;
}
/**
 * Watch a state value. Idea from Vue `watch` function.
 *
 * @param source - Source state value you need to watch
 *
 * @param callback - Value & old value callback
 *
 * @param options -
 *
 * @typeParam T - Type of the state value
 *
 * @returns
 *
 * @example
 * ```ts
 * import { useState, useEffect } from 'react';
 * import { useWatchState } from 'reactuse';
 *
 * const [count, setCount] = useState(0);
 * useWatchState(count, val => {
 *   // ...
 * });
 *
 * // it's equal to
 * useEffect(() => {
 *   // ...
 * }, [count]);
 * ```
 *
 */
declare function useWatchState<T extends any>(
    source: T,
    callback: WatchStateCallback<T, T>,
    options?: WatchStateOptions
): {
    pause(): void;
    resume(): void;
};
````

## Params

|   Name   |            Type            |             Description              | Optional |
| :------: | :------------------------: | :----------------------------------: | :------: |
|  source  |            `T`             | Source state value you need to watch |  false   |
| callback | `WatchStateCallback<T, T>` |      Value & old value callback      |  false   |
| options  |    `WatchStateOptions`     |                  -                   |   true   |

## Type Params

| Name |    Constraint     | Default Type |       Description       |
| :--: | :---------------: | :----------: | :---------------------: |
|  T   | `<T extends any>` |      -       | Type of the state value |
