import { useState } from 'react';
import { useRafFn } from '../../animation/useRafFn';
import { createTimestamp } from '../../helper';

export interface UseTimestampOptions {
    offset?: number;
    immediate?: boolean;
    callback?: (timestamp: number) => void;
}

/**
 * Reactive current timestamp.
 *
 * @example
 * ```ts
 * import { useTimestamp } from 'reactuse';
 *
 * const now = useTimestamp();
 * ```
 * @param options -
 * @returns
 */
export function useTimestamp(options: UseTimestampOptions = {}) {
    const { offset = 0, immediate = true, callback } = options;
    const [timestamp, setTimestamp] = useState(createTimestamp() + offset);

    const update = () => {
        callback?.(timestamp);
        setTimestamp(createTimestamp() + offset);
    };

    useRafFn(update, { immediate });

    return timestamp;
}
