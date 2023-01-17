# useEventHook

Utility for creating event hooks.

## Usage

## Type Declarations

```ts
interface EventHook<T = any> {
    off: EventHookOff<T>;
    on: EventHookOn<T>;
    trigger: EventHookTrigger<T>;
}
type EventHookOff<T = any> = (fn: (param?: T) => void) => void;
type EventHookOn<T = any> = (fn: (param?: T) => void) => {
    off: () => void;
};
type EventHookTrigger<T = any> = (param?: T) => void;
declare function useEventHook<T = any>(): EventHook<T>;
```

## Type Params

| Name | Constraint | Default Type | Description |
| :--: | :--------: | :----------: | :---------: |
|  T   |     -      |    `any`     |             |
