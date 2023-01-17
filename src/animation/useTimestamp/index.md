# useTimestamp

Reactive current timestamp.

## Usage

```ts
import { useTimestamp } from 'reactuse';

const now = useTimestamp();
```

## Type Declarations

```ts
interface UseTimestampOptions {
    callback?: (timestamp: number) => void;
    immediate?: boolean;
    offset?: number;
}
declare function useTimestamp(options?: UseTimestampOptions): number;
```

## Params

|  Name   |         Type          | Description | Optional |
| :-----: | :-------------------: | :---------: | :------: |
| options | `UseTimestampOptions` |      -      |   true   |
