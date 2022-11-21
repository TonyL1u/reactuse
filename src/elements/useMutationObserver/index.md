# useMutationObserver
Watch for changes being made to the DOM tree. [MutationObserver MDN](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).
## Usage

## Type Declarations
```ts
import type { MaybeElementRef, MaybeElement } from '../../helper';
/**
 * Watch for changes being made to the DOM tree. [MutationObserver MDN](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).
 *
 * @param target - DOM element or an HTML element wrapped by `useRef()`
 * @param callback - MutationObserver's callback
 * @param options - MutationObserver's options
 * @typeParam T - Type of the real HTML element
 * @returns
 * @public
 */
export declare function useMutationObserver<T extends MaybeElement>(target: MaybeElementRef<T>, callback: MutationCallback, options?: MutationObserverInit): {
    isSupported: any;
    stop: () => void;
};
```
## Params
| Name | Type | Description | Optional |
| :---: | :---: | :---: | :---: |
| target | `MaybeElementRef<T>` | DOM element or an HTML element wrapped by `useRef()` | false |
| callback | `MutationCallback` | MutationObserver's callback | false |
| options | `MutationObserverInit` | MutationObserver's options | true |
## Type Params
| Name | Constraint | Default Type | Description |
| :---: | :---: | :---: | :---: |
| T | `<T extends MaybeElement>` | -  |  Type of the real HTML element |