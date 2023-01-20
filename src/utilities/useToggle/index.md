# useToggle

A boolean switcher with utility functions.

## Usage

By default, you can use the `useToggle()` easily. Initial value of the toggler is `false` and the toggled value is `true` .

```ts
import { useToggle } from 'reactuse';

const [value, toggle] = useToggle();

console.log(value); // false
toggle();

console.log(value); // true
```

Or you can pass two specific values to the toggler.

```ts
const [value, toggle] = useToggle('YES', 'NO');

toggle();
console.log(value); // 'NO'
```

## Type Declarations

```ts
type UseToggleReturn<T, U> = [T | U, (value?: T | U) => T | U];
declare function useToggle<L = false, R = true>(): UseToggleReturn<L, R>;
```

## Type Params

| Name | Constraint | Default Type |       Description        |
| :--: | :--------: | :----------: | :----------------------: |
|  L   |     -      |   `false`    | Type of the falsy value  |
|  R   |     -      |    `true`    | Type of the truthy value |
