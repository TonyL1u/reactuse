# useClamp

Reactively clamp a value between two other values.

## Usage

## Type Declarations

```ts
declare function useClamp(value: number, min: number, max: number): [number, (value: SetStateAction<number>) => void];
```

## Params

| Name  |   Type   |  Description  | Optional |
| :---: | :------: | :-----------: | :------: |
| value | `number` | Default value |  false   |
|  min  | `number` |       -       |  false   |
|  max  | `number` |       -       |  false   |
