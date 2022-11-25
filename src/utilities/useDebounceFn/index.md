# useDebounceFn

Debounce execution of a function.

> Debounce is an overloaded waiter: if you keep asking him your requests will be ignored until you stop and give him some time to think about your latest inquiry.

## Usage

```ts
import { useDebounceFn } from 'reactuse';
const { cancel, flush } = useDebounceFn(() => {
    // write the callback function to be debounced here...
}, 1000);
```

## Type Declarations

```ts
declare function useDebounceFn<T extends FunctionArgs>(fn: T, wait?: number, options?: DebounceSettings): DebouncedFunc<(...args: Parameters<T>) => ReturnType<T>>;
```

## Params

|  Name   |        Type        |             Description             | Optional |
| :-----: | :----------------: | :---------------------------------: | :------: |
|   fn    |        `T`         |      The function to debounce       |  false   |
|  wait   |      `number`      | The number of milliseconds to delay |   true   |
| options | `DebounceSettings` |                  -                  |   true   |

## Type Params

| Name |         Constraint         | Default Type | Description |
| :--: | :------------------------: | :----------: | :---------: |
|  T   | `<T extends FunctionArgs>` |      -       |             |
