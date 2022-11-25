# useWatchRef

Watch a ref DOM element.

## Usage

```ts
import { useRef } from 'react';
import { useWatchRef } from 'reactuse';

const el = useRef<HTMLDivElement>(null);
useWatchRef(el, () => {
    // when the ref DOM element is mounted or unmounted, callback function will be triggered...
});
```

## Type Declarations

```ts
declare type WatchRefCallback<V = any, OV = any> = (value: V, oldValue: OV) => any;
interface WatchRefOptions extends WatchStateOptions {
    deps?: DependencyList;
}
declare function useWatchRef<T extends MaybeElement>(source: RefObject<T>, callback: WatchRefCallback<T | null, T | null>, options?: WatchRefOptions): () => void;
```

## Params

|   Name   |                   Type                   |        Description         | Optional |
| :------: | :--------------------------------------: | :------------------------: | :------: |
|  source  |              `RefObject<T>`              |     A ref DOM element      |  false   |
| callback | `WatchRefCallback<T \| null, T \| null>` | Value & old value callback |  false   |
| options  |            `WatchRefOptions`             |             -              |   true   |

## Type Params

| Name |         Constraint         | Default Type |          Description          |
| :--: | :------------------------: | :----------: | :---------------------------: |
|  T   | `<T extends MaybeElement>` |      -       | Type of the real HTML element |
