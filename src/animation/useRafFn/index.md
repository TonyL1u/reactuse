# useRafFn

Call function on every `requestAnimationFrame`. With controls of pausing and resuming.

## Usage

```ts
import { useState } from 'react';
import { useRafFn } from 'reactuse';

const [count, setCount] = useState(0);
const { resume, pause } = useRafFn(() => {
    setCount(count + 1);
});
```

## Type Declarations

```ts
interface UseRafFnFnCallbackArguments {
    /**
     * Time elapsed between this and the last frame.
     */
    delta: number;
    /**
     * Time elapsed since the creation of the web page. See {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#the_time_origin Time origin}.
     */
    timestamp: DOMHighResTimeStamp;
}
interface UseRafFnOptions {
    /**
     * Run the callback function immediately
     *
     * @defaultValue true
     */
    immediate?: boolean;
}
interface UseRafFnReturn {
    isActive: boolean;
    pause: () => void;
    resume: () => void;
}
declare function useRafFn(fn: (args: UseRafFnFnCallbackArguments) => void, options?: UseRafFnOptions): UseRafFnReturn;
```

## Params

|  Name   |                     Type                      |    Description    | Optional |
| :-----: | :-------------------------------------------: | :---------------: | :------: |
|   fn    | `(args: UseRafFnFnCallbackArguments) => void` | Callback function |  false   |
| options |               `UseRafFnOptions`               |         -         |   true   |
