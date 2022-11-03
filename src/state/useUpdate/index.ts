import { useCallback, useState } from 'react';

export function useUpdate() {
    const [_, setState] = useState({});

    return useCallback(() => setState({}), []);
}
