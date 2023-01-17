import { isBrowser } from './isBrowser';
import type { MaybeElementRef, MaybeElement } from './types';

export function getTargetElement<T extends MaybeElement>(target: MaybeElementRef<T>) {
    if (!isBrowser) {
        return undefined;
    }

    let targetElement: T | null;

    // @ts-ignore
    if (target && 'current' in target) {
        targetElement = target.current;
    } else {
        targetElement = target;
    }

    return targetElement;
}
