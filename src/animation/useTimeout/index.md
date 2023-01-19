# useTimeout

Update value after a given time with controls.

## Usage

```ts
import { useTimeout } from 'reactuse';

const { ready } = useTimeout(2000);

console.log(ready); // ready will be set to true after 2s
```

## Type Declarations

```ts
interface UseTimeoutOptions extends UseTimeoutFnOptions {}
interface UseTimeoutReturn extends Omit<UseTimeoutFnReturn, 'isPending'> {
    ready: boolean;
}
declare function useTimeout(interval?: number, options?: UseTimeoutOptions): UseTimeoutReturn;
```

## Params

|   Name   |        Type         |        Description        | Optional |
| :------: | :-----------------: | :-----------------------: | :------: |
| interval |      `number`       | Change status after x ms. |   true   |
| options  | `UseTimeoutOptions` |             -             |   true   |
