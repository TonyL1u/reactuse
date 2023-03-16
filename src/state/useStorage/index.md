# useStorage

Reactive [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)/[SessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).

## Usage

```ts
import { useStorage } from 'reactuse';

// bind object
const [myObject] = useStorage('my-object', { hello: 'hi', greeting: 'Hello' });

// bind boolean
const [myBoolean] = useStorage('my-boolean', true);

// bind string
const [myString] = useStorage('my-string', 'Hello world', { storage: sessionStorage });

// bind number
const [myNumber] = useStorage('my-number', 0);

// bind date
const [myDate] = useStorage('my-date', new Date());
```

## Type Declarations

```ts
interface UseStorageOptions {
    /**
     * Listen to storage changes, useful for multiple tabs application
     *
     * @defaultValue false
     */
    listenToStorageChanges?: boolean;
    /**
     * Merge the default value with the value read from the storage.
     *
     * When setting it to true, it will perform a **shallow merge** for objects. You can pass a function to perform custom merge (e.g. deep merge), for example:
     *
     * @defaultValue false
     */
    mergeDefaults?: boolean;
    /**
     * On error callback
     *
     * Default log error to `console.error`
     */
    onError?: (e: unknown) => void;
    storage?: Storage;
}
type UseStorageReturn<T> = readonly [T | null, (data: T) => void, () => void];
declare function useStorage(key: string, defaults: boolean, options?: UseStorageOptions): UseStorageReturn<boolean>;
```

## Params

|   Name   |        Type         |       Description       | Optional |
| :------: | :-----------------: | :---------------------: | :------: |
|   key    |      `string`       | Key of the storage item |  false   |
| defaults |         `T`         |      Default value      |  false   |
| options  | `UseStorageOptions` |            -            |   true   |

## Type Params

| Name |          Constraint           | Default Type |        Description        |
| :--: | :---------------------------: | :----------: | :-----------------------: |
|  T   | `<T extends StorageDataType>` |      -       | Type of the storage value |
