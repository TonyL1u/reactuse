# useElementVisibility

Tracks the visibility of an element within the viewport.

## Usage

```ts
import { useRef } from 'react';
import { useElementVisibility } from 'reactuse';

const el = useRef<HTMLDivElement>(null);
// visible is expected to be `false` when element is out of the viewport
const visible = useElementVisibility();
```

## Type Declarations

```ts
declare function useElementVisibility<T extends MaybeElement>(target: MaybeElementRef<T>): boolean;
```

## Params

|  Name  |         Type         | Description | Optional |
| :----: | :------------------: | :---------: | :------: |
| target | `MaybeElementRef<T>` |      -      |  false   |

## Type Params

| Name |         Constraint         | Default Type | Description |
| :--: | :------------------------: | :----------: | :---------: |
|  T   | `<T extends MaybeElement>` |      -       |             |
