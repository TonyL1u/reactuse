# useScroll

Reactive scroll.

## Usage

## Type Declarations

```ts
interface UseScrollOptions extends ConfigurableEventFilter {
    /**
     * Listener options for scroll event.
     *
     * @defaultValue {capture: false, passive: true}
     */
    eventListenerOptions?: boolean | AddEventListenerOptions;
    /**
     * The check time when scrolling ends. This configuration will be setting to (throttle + idle) when the `throttle` is configured.
     *
     * @defaultValue 200
     */
    idle?: number;
    /**
     * Offset arrived states by x pixels
     */
    offset?: {
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
    };
    /**
     * Trigger it when scrolling.
     */
    onScroll?: (e: Event) => void;
    /**
     * Trigger it when scrolling ends.
     */
    onStop?: (e: Event) => void;
}
interface UseScrollReturn {
    arrivedState: ArrivedState;
    isScrolling: boolean;
    x: number;
    y: number;
}
interface ArrivedState {
    bottom: boolean;
    left: boolean;
    right: boolean;
    top: boolean;
}
declare function useScroll<T extends MaybeElement>(target: MaybeElementRef<T>, options?: UseScrollOptions): UseScrollReturn;
```

## Params

|  Name   |         Type         | Description | Optional |
| :-----: | :------------------: | :---------: | :------: |
| target  | `MaybeElementRef<T>` |      -      |  false   |
| options |  `UseScrollOptions`  |      -      |   true   |

## Type Params

| Name |         Constraint         | Default Type | Description |
| :--: | :------------------------: | :----------: | :---------: |
|  T   | `<T extends MaybeElement>` |      -       |             |
