import { useLocation } from 'react-router-dom';
import { watchState, tryOnMounted, tryOnUnmounted } from '../../shared';
import { useEventHook } from '../../utilities';
import type { Location } from 'react-router-dom';
import type { EventHook } from '../../utilities';
import type { Merge } from '../../helper';

type HookPayload<T extends keyof Location> = Merge<Record<T, Location[T]>, { location: Location }>;

export function useRouter() {
    const location = useLocation();
    const hooksMap = new Map<keyof Location, EventHook<HookPayload<any>>>();
    const createChangeHook = <T extends keyof Location>(key: T) => {
        if (!hooksMap.get(key)) {
            const hook = useEventHook<HookPayload<T>>();
            hooksMap.set(key, hook);

            return hook;
        }

        return hooksMap.get(key) as EventHook<HookPayload<T>>;
    };

    watchState(location, (to, from) => {
        for (const [key, hook] of hooksMap) {
            if (to[key] !== from[key]) {
                hook?.trigger({ [key]: to[key], location });
            }
        }
    });

    tryOnUnmounted(() => {
        hooksMap.clear();
    });

    return {
        ...location,
        onLocationChange<T extends keyof Location>(key: T, callback: (param: HookPayload<T>) => void, options: { immediately?: boolean } = {}) {
            const { immediately = false } = options;

            const { on, trigger } = createChangeHook(key);
            const { off } = on(callback as any);

            tryOnMounted(() => {
                immediately && trigger({ [key]: location[key], location } as HookPayload<T>);
            });
            tryOnUnmounted(off);

            return off;
        }
    };
}
