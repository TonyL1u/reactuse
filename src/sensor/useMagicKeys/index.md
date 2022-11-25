# useMagicKeys

Reactive keys pressed state, with magical keys combination support.

> This hook returns a [`proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) object. So that, it's **NOT** support by <u>IE 11 or below</u>.

## Usage

```ts
import { useMagicKeys, useWatchState } from 'reactuse';

const { shift /* keys you want to monitor */ } = useMagicKeys();
useWatchState(shift, v => {
    // when press down the shift key, the `v` will be true
    if (v) {
        console.log('shift has been pressed');
    }
});
```

Notice that, name of the key is **CASE INSENSITIVE**. [Click here](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values) to check all available keycodes.

You can combine any keys together with the delimiter `+`, `-` or `.` .

```ts
import { useMagicKeys, useWatchState } from 'reactuse';

const { ctrl_a } = useMagicKeys();
useWatchState(ctrl_a, v => {
    if (v) {
        console.log('control + a have been pressed');
    }
});

// or do the same thing in this way
const keys = useMagicKeys();
const ShiftA = keys['shift+a'];
```

## Type Declarations

```ts
interface UseMagicKeysOptions {
    /**
     * The separator that splits the combination keys
     */
    delimiter?: string;
    /**
     * Custom event handler for keydown/keyup event
     */
    onEventFired?: (e: KeyboardEvent) => void | boolean;
    /**
     * Register passive listener
     *
     * @default true
     */
    passive?: boolean;
}
declare type UseMagicKeysReturn = Readonly<Omit<Record<string, boolean>, keyof MagicKeysInternal> & MagicKeysInternal>;
interface MagicKeysInternal {
    /**
     * A Set of currently pressed keys
     */
    current: Set<string>;
}
declare function useMagicKeys(options?: UseMagicKeysOptions): UseMagicKeysReturn;
```

## Params

|  Name   |         Type          | Description | Optional |
| :-----: | :-------------------: | :---------: | :------: |
| options | `UseMagicKeysOptions` |      -      |   true   |
