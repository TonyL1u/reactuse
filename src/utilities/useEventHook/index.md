# useEventHook

Utility for creating event hooks.

## Usage

```ts
// define your hook
import { useEventHook } from 'reactuse';

export function useFetch(url: string) {
    const resultHook = useEventHook();
    const errorHook = useEventHook();

    fetch(url)
        .then(res => resultHook.trigger(res))
        .catch(err => errorHook.trigger(err));

    return { onSuccess: resultHook.on, onError: errorHook.on };
}
```

```ts
// use your hook
import { useFetch } from './useFetch';

const { onSuccess, onError } = useFetch('your api');

onSuccess(res => console.log(res));
onError(err => console.error(err));
```
