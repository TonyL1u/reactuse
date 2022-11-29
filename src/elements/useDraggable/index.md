# useDraggable

Make elements draggable.

## Usage

Under hook, `useDraggable` uses [`CSS translate`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate) to make elements draggable. You can also choose your own way to position the element. For example:

```ts
const el = useRef<HTMLDivElement>(null);
const { x, y } = useDraggable(el);
```

```tsx
<div ref={el} style={{ position: 'absolute', top: y, left: x }}></div>
```

Sometimes you may want to restrict an element that can only be dragged in a specific area. All you need to do is giving it an dragging wrapper area (default is Window).

```tsx
import { useRef } from 'react';
import { useDraggable } from 'reactuse';

export default () => {
    const wrapper = useRef<HTMLDivElement>(null);
    const el = useRef<HTMLDivElement>(null);
    const { style } = useDraggable(el, { wrap: true, draggingArea: wrapper });

    return (
        <div ref={wrapper}>
            <div ref={el} style={style}></div>
        </div>
    );
};
```

## Type Declarations

```ts
interface UseDraggableOptions {
    draggingArea?: MaybeElementRef;
    onDragging?: (e: PointerEvent) => void;
    onEnd?: (e: PointerEvent) => void;
    onStart?: (e: PointerEvent) => void | boolean;
    wrap?: boolean;
}
interface UseDraggableReturn {
    isDragging: boolean;
    style: {
        transform: string;
    };
    syncPosition: (x: number, y: number) => void;
    x: number;
    y: number;
}
declare function useDraggable<T extends Exclude<MaybeElement, Window | Document>>(target: MaybeElementRef<T>, options?: UseDraggableOptions): UseDraggableReturn;
```

## Params

|  Name   |         Type          |                     Description                      | Optional |
| :-----: | :-------------------: | :--------------------------------------------------: | :------: |
| target  | `MaybeElementRef<T>`  | DOM element or an HTML element wrapped by `useRef()` |  false   |
| options | `UseDraggableOptions` |                          -                           |   true   |

## Type Params

| Name |                       Constraint                        | Default Type |          Description          |
| :--: | :-----------------------------------------------------: | :----------: | :---------------------------: |
|  T   | `<T extends Exclude<MaybeElement, Window \| Document>>` |      -       | Type of the real HTML element |
