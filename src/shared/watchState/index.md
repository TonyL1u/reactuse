# watchState

Watch a state value. Idea from Vue `watch` function.

## Usage

```ts
import { useState, useEffect } from 'react';
import { watchState } from 'reactuse';

const [count, setCount] = useState(0);
watchState(count, val => {
    // ...
});

// it' s equal to
useEffect(() => {
    // ...
}, [count]);
```
