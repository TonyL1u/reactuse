# useTimeoutFn

Wrapper for `setTimeout` with controls.

## Usage

```ts
import { useTimeoutFn } from 'reactuse';

const { start, stop } = useTimeoutFn(() => {
    // fired after 1000ms...
}, 1000);

start(); // start timer
stop(); // stop timer
```

## Type Declarations

```ts
interface UseTimeoutFnOptions {
    /**
     * Running the timer automatically after calling this function
     *
     * @defaultValue true
     */
    auto?: boolean;
}
interface UseTimeoutFnReturn {
    isPending: boolean;
    start: () => void;
    stop: () => void;
}
declare function useTimeoutFn(cb: (...args: unknown[]) => any, interval: number, options?: UseTimeoutFnOptions): UseTimeoutFnReturn;
```

## Params

|   Name   |             Type              |         Description         | Optional |
| :------: | :---------------------------: | :-------------------------: | :------: |
|    cb    | `(...args: unknown[]) => any` | The function to be executed |  false   |
| interval |           `number`            |              -              |  false   |
| options  |     `UseTimeoutFnOptions`     |              -              |   true   |
