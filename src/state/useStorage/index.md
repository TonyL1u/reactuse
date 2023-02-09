# useStorage

## Usage

## Type Declarations

```ts
interface UseStorageOptions {
    listenToStorageChanges?: boolean;
    mergeDefaults?: boolean;
    onError?: (e: unknown) => void;
    storage?: Storage;
}
type UseStorageReturn<T> = readonly [T | null, (data: T) => void, () => void];
declare function useStorage(key: string, defaults: boolean, options?: UseStorageOptions): UseStorageReturn<boolean>;
```

## Params

|   Name   |        Type         | Description | Optional |
| :------: | :-----------------: | :---------: | :------: |
|   key    |      `string`       |             |  false   |
| defaults |      `boolean`      |             |  false   |
| options  | `UseStorageOptions` |             |   true   |
