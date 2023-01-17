# useFps

Reactive FPS (frames per second).

## Usage

```ts
import { useFps } from 'reactuse';

const fps = useFps();
```

## Type Declarations

```ts
interface UseFpsOptions {
    /**
     * Calculate the FPS on every x frames.
     *
     * @defaultValue 10
     */
    every?: number;
}
declare function useFps(options?: UseFpsOptions): number;
```

## Params

|  Name   |      Type       | Description | Optional |
| :-----: | :-------------: | :---------: | :------: |
| options | `UseFpsOptions` |      -      |   true   |
