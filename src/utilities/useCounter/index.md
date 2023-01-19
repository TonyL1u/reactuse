# useCounter

Basic counter with utility functions.

## Usage

```ts
import { useCounter } from 'reactuse';

const { count, inc, dec, set, reset } = useCounter();
```

## Type Declarations

```ts
interface UseCounterOptions {
    max?: number;
    min?: number;
}
interface UseCounterReturn {
    count: number;
    dec: (step?: number) => void;
    get: () => number;
    inc: (step?: number) => void;
    reset: () => void;
    set: (value?: number) => void;
}
declare function useCounter(initialValue?: number, options?: UseCounterOptions): UseCounterReturn;
```

## Params

|     Name     |        Type         |            Description            | Optional |
| :----------: | :-----------------: | :-------------------------------: | :------: |
| initialValue |      `number`       | The initial value of the counter. |   true   |
|   options    | `UseCounterOptions` |                 -                 |   true   |
