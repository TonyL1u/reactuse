# useTextSelection

Reactively track user text selection based on [`Window.getSelection`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection).

## Usage

```ts
import { useTextSelection } from 'reactuse';

const { text } = useTextSelection();
```

## Type Declarations

```ts
declare function useTextSelection(): {
    text: string;
    ranges: Range[];
    rects: DOMRect[];
};
```
