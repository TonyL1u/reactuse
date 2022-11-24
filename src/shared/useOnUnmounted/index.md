# useOnUnmounted

A hook that executes the function right before the component is unmounted.

## Usage

```ts
import { useOnUnmounted } from 'reactuse';

useOnUnmounted(() => {
    // something you want to call when component is unmounted...
});
```

## Type Declarations

````ts
/**
 * A hook that executes the function right before the component is unmounted.
 *
 * @param fn - The function to be executed
 *
 * @example
 * ```ts
 * import { useOnUnmounted } from 'reactuse';
 *
 * useOnUnmounted(() => {
 *     // something you want to call when component is unmounted...
 * })
 * ```
 *
 */
declare function useOnUnmounted(fn: () => void): void;
````

## Params

| Name |     Type     |         Description         | Optional |
| :--: | :----------: | :-------------------------: | :------: |
|  fn  | `() => void` | The function to be executed |  false   |
