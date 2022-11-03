import { useState } from 'react';
import { tryOnMounted } from '../tryOnMounted';

export function useMounted() {
    const [isMounted, update] = useState(false);

    tryOnMounted(() => {
        update(true);
    });

    return isMounted;
}
