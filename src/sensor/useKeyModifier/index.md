# useKeyModifier

Reactive [Modifier State](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState). Tracks state of any of the [supported modifiers](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState#browser_compatibility) - see Browser Compatibility notes.

## Usage

```ts
import { useKeyModifier } from 'reactuse';

const Shift = useKeyModifier('Shift');

// Press down the Shift key
console.log(Shift); // true
```

## Type Declarations

```ts
type KeyModifier = 'Alt' | 'AltGraph' | 'CapsLock' | 'Control' | 'Fn' | 'FnLock' | 'Meta' | 'NumLock' | 'ScrollLock' | 'Shift' | 'Symbol' | 'SymbolLock';
interface UseKeyModifierOptions {
    /**
     * Event names that will prompt update to modifier states
     *
     * @defaultValue ['mousedown', 'mouseup', 'keydown', 'keyup']
     */
    events?: WindowEventName[];
    /**
     * Initial value of the returned ref
     *
     * @defaultValue false
     */
    initial?: boolean;
}
declare function useKeyModifier<T extends KeyModifier>(modifier: T, options?: UseKeyModifierOptions): boolean;
```

## Params

|   Name   |          Type           | Description  | Optional |
| :------: | :---------------------: | :----------: | :------: |
| modifier |           `T`           | Key modifier |  false   |
| options  | `UseKeyModifierOptions` |      -       |   true   |

## Type Params

| Name |        Constraint         | Default Type | Description |
| :--: | :-----------------------: | :----------: | :---------: |
|  T   | `<T extends KeyModifier>` |      -       |             |
