# useElementSize

Reactive size of an HTML element. [ResizeObserver MDN](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

## Usage

```tsx
import { useRef } from 'react';
import { useElementSize } from 'reactuse';

const el = useRef<HTMLTextAreaElement | null>(null);
const size = useElementSize(el);
```

## Params

|  Name   |          Type           | Default |   Description    |
| :-----: | :---------------------: | :-----: | :--------------: |
| target  |  `MaybeElementRef<T>`   | `true`  | DOM 节点或者 Ref |
| options | `ResizeObserverOptions` | `true`  |       选项       |

## Returns

|  Name  |   Type   | Default |   Description    |
| :----: | :------: | :-----: | :--------------: |
| width  | `number` |  `NaN`  | DOM 节点或者 Ref |
| height | `number` |  `NaN`  |       选项       |
