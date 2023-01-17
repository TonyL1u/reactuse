# useIdle

Tracks whether the user is being inactive.

## Usage

```ts
import { useIdle } from 'reactuse';

const { idle, lastActive } = useIdle(2000);
console.log(idle);
```

## Type Declarations

```ts
interface UseIdleOptions extends ConfigurableEventFilter {
    /**
     * Event names that listen to for detected user activity
     *
     * @defaultValue ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel']
     */
    events?: WindowEventName[];
    initialState?: boolean;
}
interface UseIdleReturn {
    idle: boolean;
    /**
     * Timestamp that the user is being active last time
     */
    lastActive: number;
}
declare function useIdle(timeout?: number, options?: UseIdleOptions): UseIdleReturn;
```

## Params

|  Name   |       Type       |       Description       | Optional |
| :-----: | :--------------: | :---------------------: | :------: |
| timeout |     `number`     | Set to idled after x ms |   true   |
| options | `UseIdleOptions` |            -            |   true   |
