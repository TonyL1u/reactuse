# useOnMounted

A hook that executes a function after the component is mounted.

## Usage

```ts
import { useOnMounted } from 'reactuse';

useOnMounted(() => {
    // something you want to call when component is mounted...
});
```

## Type Declarations

```ts
declare function useOnMounted(fn: () => void): void;
```

## Params

| Name |     Type     |         Description         | Optional |
| :--: | :----------: | :-------------------------: | :------: |
|  fn  | `() => void` | The function to be executed |  false   |
