# useDocumentVisibility

Reactively track [`document.visibilityState`](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState).

## Usage

```ts
import { useDocumentVisibility } from 'reactuse';

const visible = useDocumentVisibility();
```

## Type Declarations

````ts
/**
 * Reactively track [`document.visibilityState`](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState).
 *
 * @returns
 *
 * @example
 * ```ts
 * import { useDocumentVisibility } from 'reactuse';
 *
 * const visible = useDocumentVisibility();
 * ```
 *
 */
declare function useDocumentVisibility(): DocumentVisibilityState;
````
