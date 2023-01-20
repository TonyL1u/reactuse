# useCycleList

Cycle through a list of items.

## Usage

```ts
import { useCycleList } from 'reactuse';

const { current, next, prev } = useCycleList(['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'] as const);

console.log(current); // 'Mon'

next();
console.log(current); // 'Tues'
```

## Type Declarations

```ts
interface UseCycleListOptions {
    /**
     * The default index of the list.
     *
     * @defaultValue 0
     */
    initialIndex?: number;
}
interface UseCycleListReturn<T> {
    current: T;
    index: number;
    next: (step?: number) => T;
    prev: (step?: number) => T;
    seek: (i?: number) => T;
}
declare function useCycleList<T>(list: readonly T[], options?: UseCycleListOptions): UseCycleListReturn<T>;
```

## Params

|  Name   |         Type          |   Description   | Optional |
| :-----: | :-------------------: | :-------------: | :------: |
|  list   |    `readonly T[]`     | Cycle list data |  false   |
| options | `UseCycleListOptions` |        -        |   true   |

## Type Params

| Name | Constraint | Default Type | Description |
| :--: | :--------: | :----------: | :---------: |
|  T   |     -      |      -       |             |
