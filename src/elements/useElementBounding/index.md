# useElementBounding

Reactive [bounding box](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) of an HTML element.

## Usage

```ts
import { useRef } from 'react';
import { useElementBounding } from 'reactuse';

const el = useRef<HTMLTextAreaElement | null>(null);
const bounding = useElementBounding(el);
```
