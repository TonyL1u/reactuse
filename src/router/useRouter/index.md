# useRouter

Enhanced react router hook, based on library `react-router-dom` .

## Usage

```ts
import { setTitle, useRouter } from 'reactuse';

const { onLocationChange } = useRouter();
const { setTitle } = useTitle();

// will auto set title when path changed
onLocationChange(
    'pathname',
    ({ pathname }) => {
        setTitle(`${pathname.slice(1)} | ReactUse`);
    },
    { immediately: true }
);
```
