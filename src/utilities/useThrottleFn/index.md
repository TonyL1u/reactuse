# useThrottleFn

Throttle execution of a function. Especially useful for rate limiting execution of handlers on events like resize and scroll.

> Throttle is a spring that throws balls: after a ball flies out it needs some time to shrink back, so it cannot throw any more balls unless it's ready.

## Usage

```ts
import { useThrottleFn } from 'reactuse';
const { cancel, flush } = useThrottleFn(() => {
    // write the callback function to be throttled here...
}, 1000);
```

## Type Declarations

````ts
/**
 * Throttle execution of a function. Especially useful for rate limiting execution of handlers on events like resize and scroll.
 *
 * > Throttle is a spring that throws balls: after a ball flies out it needs some time to shrink back, so it cannot throw any more balls unless it's ready.
 *
 * @param fn - The function to throttle
 *
 * @param wait - The number of milliseconds to throttle invocations to
 *
 * @param trailing - Specify invoking on the leading edge of the timeout
 *
 * @param leading - Specify invoking on the trailing edge of the timeout
 *
 * @typeParam T - Type of the throttle target
 *
 * @returns Returns the new throttled function.
 *
 * @example
 * ```ts
 * import { useThrottleFn } from 'reactuse';
 * const { cancel, flush } = useThrottleFn(() => {
 *     // write the callback function to be throttled here...
 * }, 1000);
 * ```
 *
 */
declare function useThrottleFn<T extends FunctionArgs>(fn: T, wait?: number, trailing?: boolean, leading?: boolean): DebouncedFunc<(...args: Parameters<T>) => ReturnType<T>>;
````

## Params

|   Name   |   Type    |                      Description                      | Optional |
| :------: | :-------: | :---------------------------------------------------: | :------: |
|    fn    |    `T`    |               The function to throttle                |  false   |
|   wait   | `number`  | The number of milliseconds to throttle invocations to |   true   |
| trailing | `boolean` |  Specify invoking on the leading edge of the timeout  |   true   |
| leading  | `boolean` | Specify invoking on the trailing edge of the timeout  |   true   |

## Type Params

| Name |         Constraint         | Default Type |         Description         |
| :--: | :------------------------: | :----------: | :-------------------------: |
|  T   | `<T extends FunctionArgs>` |      -       | Type of the throttle target |
