# useMouse

Reactive mouse position.

## Usage

```ts
import { useMouse } from 'reactuse';

const { x, y, sourceType } = useMouse();
```

## Type Declarations

```ts
interface UseMouseOptions extends ConfigurableEventFilter {
    /**
     * Initial values
     */
    initialValue?: CursorState;
    /**
     * Listen to `touchmove` events
     *
     * @defaultValue true
     */
    touch?: boolean;
    /**
     * Mouse position based by page or client
     *
     * @defaultValue 'page'
     */
    type?: 'page' | 'client';
}
type CursorState = {
    x: number;
    y: number;
};
interface UseMouseReturn extends CursorState {
    sourceType: MouseSourceType;
}
type MouseSourceType = 'mouse' | 'touch' | null;
declare function useMouse(options?: UseMouseOptions): UseMouseReturn;
```

## Params

|  Name   |       Type        | Description | Optional |
| :-----: | :---------------: | :---------: | :------: |
| options | `UseMouseOptions` |      -      |   true   |
