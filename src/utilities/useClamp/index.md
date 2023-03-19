# useClamp

Reactively clamp a value between two other values.

## Usage

```ts
import { useClamp } from 'reactuse';

const MIN = 0;
const MAX = 10;
const [value, setValue] = useClamp(0, MIN, MAX);
```

## Type Declarations

```ts
type UseClampReturn = [number, (value: SetStateAction<number>) => void];
declare function useClamp(value: number, min: number, max: number): UseClampReturn;
```

## Params

| Name  |   Type   |       Description        | Optional |
| :---: | :------: | :----------------------: | :------: |
| value | `number` |      Default value       |  false   |
|  min  | `number` | Min value of the clamper |  false   |
|  max  | `number` | Max value of the clamper |  false   |
