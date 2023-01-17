# useTextSelection

Reactively track user text selection based on [`Window.getSelection`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection).

## Usage

```ts
import { useTextSelection } from 'reactuse';

const { text } = useTextSelection();
```

## Type Declarations

```ts
interface UseTextSelectionReturn {
    ranges: Range[];
    rects: DOMRect[];
    /**
     * Current selected text.
     */
    text: string;
}
declare function useTextSelection(): UseTextSelectionReturn;
```
