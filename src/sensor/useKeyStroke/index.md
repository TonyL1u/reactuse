# useKeyStroke

Listen for keyboard key being stroked.

## Usage

```ts
import { useKeyStroke, useKeyDown, useKeyUp, useKeyPress } from 'reactuse';

useKeyStroke('S', e => {
    // ...
});
```

If you want to listen all keys, just skip the key definition.

```ts
useKeyStroke(e => {
    // ...
});
```

We also provide some shorthands:

-   `useKeyDown` - alias for `useKeyStroke(key, handler, {eventName: 'keydown'})`
-   `useKeyUp` - alias for `useKeyStroke(key, handler, {eventName: 'keyup'})`
-   `useKeyPress` - alias for `useKeyStroke(key, handler, {eventName: 'keypress'})`

## Type Declarations

```ts
declare type KeyEventGuard = (event: KeyboardEvent) => boolean;
declare type KeyEventHandler = (e: KeyboardEvent) => void;
declare type KeyFilter = string | string[] | KeyEventGuard;
interface UseKeyStrokeOptions {
    target?: MaybeElementRef;
    event?: 'keydown' | 'keyup' | 'keypress';
    passive?: boolean;
}
/**
 * Overload 1: Omitted key, listen to all keys
 *
 * @param handler - callback
 * @param options
 */
declare function useKeyStroke(handler: KeyEventHandler, options?: UseKeyStrokeOptions): Fn;
/**
 * Overload 2: Listen to a specific key
 * @param key - The key to be listener
 * @param handler - callback
 * @param options
 */
declare function useKeyStroke(key: KeyFilter, handler: KeyEventHandler, options?: UseKeyStrokeOptions): Fn;
declare function useKeyDown(key: KeyFilter, handler: KeyEventHandler, options?: Omit<UseKeyStrokeOptions, 'event'>): Fn;
declare function useKeyUp(key: KeyFilter, handler: KeyEventHandler, options?: Omit<UseKeyStrokeOptions, 'event'>): Fn;
declare function useKeyPress(key: KeyFilter, handler: KeyEventHandler, options?: Omit<UseKeyStrokeOptions, 'event'>): Fn;
```
