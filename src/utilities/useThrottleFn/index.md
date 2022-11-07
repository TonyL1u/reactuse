# useThrottleFn

Throttle execution of a function. Especially useful for rate limiting execution of handlers on events like resize and scroll.

> Throttle is a spring that throws balls: after a ball flies out it needs some time to shrink back, so it cannot throw any more balls unless it's ready.

## Usage

```ts
import { useThrottleFn } from 'reactuse';

const { cancel, flush } = useThrottleFn(() => {
    /** callback function that will be throttled */
}, 1000);
```
