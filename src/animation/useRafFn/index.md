# useRafFn

Call function on every `requestAnimationFrame`. With controls of pausing and resuming.

## Usage

## Type Declarations

```ts
interface useRafFnFnCallbackArguments {
    /**
     * Time elapsed between this and the last frame.
     */
    delta: number;
    /**
     * Time elapsed since the creation of the web page. See {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#the_time_origin Time origin}.
     */
    timestamp: DOMHighResTimeStamp;
}
interface useRafFnOptions {
    immediate?: boolean;
}
interface useRafFnReturn {
    isActive: boolean;
    pause: () => void;
    resume: () => void;
}
declare function useRafFn(fn: (args: useRafFnFnCallbackArguments) => void, options?: useRafFnOptions): useRafFnReturn;
```

## Params

|  Name   |                     Type                      | Description | Optional |
| :-----: | :-------------------------------------------: | :---------: | :------: |
|   fn    | `(args: useRafFnFnCallbackArguments) => void` | callback fn |  false   |
| options |               `useRafFnOptions`               |      -      |   true   |
