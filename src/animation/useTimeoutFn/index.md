# useTimeoutFn

## Usage

## Type Declarations

```ts
declare function useTimeoutFn(
    cb: (...args: unknown[]) => any,
    interval: number,
    options?: UseTimeoutFnOptions
): {
    isPending: boolean;
    start: (...args: unknown[]) => void;
    stop: () => void;
};
```

## Params

|   Name   |             Type              | Description | Optional |
| :------: | :---------------------------: | :---------: | :------: |
|    cb    | `(...args: unknown[]) => any` |      -      |  false   |
| interval |           `number`            |      -      |  false   |
| options  |     `UseTimeoutFnOptions`     |      -      |   true   |
