import { useState } from 'react';
import { useEventListener } from '../../browser/useEventListener';
import { useOnMounted } from '../../shared/useOnMounted';

type StorageDataType = boolean | string | number | object | Map<any, any> | Set<any> | Date;

interface Serializers<T> {
    read: (v: string) => T;
    write: (v: T) => string;
}

function createStorageSerializers<T extends StorageDataType>(data: T): Serializers<T> {
    switch (typeof data) {
        case 'boolean':
            return { read: (v: string) => (v === 'true') as T, write: (v: T) => String(v) };
        case 'string':
            return { read: (v: string) => v as T, write: (v: T) => String(v) };
        case 'number':
            return { read: (v: string) => Number.parseFloat(v) as T, write: (v: T) => String(v) };
        case 'object':
            if (data instanceof Map) {
                return { read: (v: string) => new Map(JSON.parse(v)) as T, write: (v: T) => JSON.stringify(Array.from((v as Map<any, any>).entries())) };
            } else if (data instanceof Set) {
                return { read: (v: string) => new Set(JSON.parse(v)) as T, write: (v: T) => JSON.stringify(Array.from(v as Set<any>)) };
            } else if (data instanceof Date) {
                return { read: (v: string) => new Date(v) as T, write: (v: T) => v.toString() };
            } else {
                return { read: (v: string) => JSON.parse(v) as T, write: (v: T) => JSON.stringify(v) };
            }
    }
}

export interface UseStorageOptions {
    storage?: Storage;
    /**
     * Merge the default value with the value read from the storage.
     *
     * When setting it to true, it will perform a **shallow merge** for objects.
     * You can pass a function to perform custom merge (e.g. deep merge), for example:
     *
     * @defaultValue false
     */
    mergeDefaults?: boolean;
    /**
     * Listen to storage changes, useful for multiple tabs application
     *
     * @defaultValue false
     */
    listenToStorageChanges?: boolean;
    /**
     * On error callback
     *
     * Default log error to `console.error`
     */
    onError?: (e: unknown) => void;
}

export type UseStorageReturn<T> = readonly [T | null, (data: T) => void, () => void];

export function useStorage(key: string, defaults: boolean, options?: UseStorageOptions): UseStorageReturn<boolean>;
export function useStorage(key: string, defaults: string, options?: UseStorageOptions): UseStorageReturn<string>;
export function useStorage(key: string, defaults: number, options?: UseStorageOptions): UseStorageReturn<number>;
export function useStorage<T>(key: string, defaults: T, options?: UseStorageOptions): UseStorageReturn<T>;
/**
 * Reactive [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)/[SessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).
 *
 * @example
 * ```ts
 * import { useStorage } from 'reactuse';
 *
 * // bind object
 * const [myObject] = useStorage('my-object', { hello: 'hi', greeting: 'Hello' });
 *
 * // bind boolean
 * const [myBoolean] = useStorage('my-boolean', true);
 *
 * // bind string
 * const [myString] = useStorage('my-string', 'Hello world', { storage: sessionStorage });
 *
 * // bind number
 * const [myNumber] = useStorage('my-number', 0);
 *
 * // bind date
 * const [myDate] = useStorage('my-date', new Date());
 * ```
 * @param key Key of the storage item
 * @param defaults Default value
 * @param options
 * @returns
 */
export function useStorage<T extends StorageDataType>(key: string, defaults: T, options: UseStorageOptions = {}): UseStorageReturn<T> {
    const { storage = localStorage, mergeDefaults = false, listenToStorageChanges = false, onError = console.error } = options;
    const { read: readFromStorage, write: writeToStorage } = createStorageSerializers(defaults);
    const [value, setValue] = useState<T | null>(() => {
        if (!mergeDefaults) return defaults;

        const rawValue = storage.getItem(key);
        if (rawValue === null) return defaults;

        const value = JSON.parse(rawValue);
        if (value === null) return defaults;

        if (typeof value === 'object' && typeof defaults === 'object') return { ...value, ...defaults } as T;

        return defaults;
    });

    const read = (rawValue: string | null) => {
        if (rawValue === null) return null;

        return readFromStorage(rawValue);
    };

    const write = (data: T) => {
        try {
            const oldValue = storage.getItem(key);
            const serialized = writeToStorage(data);

            if (oldValue !== serialized) {
                storage.setItem(key, serialized);
                setValue(data);

                window?.dispatchEvent(new StorageEvent('storage', { key, oldValue, newValue: serialized, storageArea: storage }));
            }
        } catch (e) {
            onError(e);
        }
    };

    const remove = () => {
        storage.removeItem(key);
        setValue(null);
    };

    useOnMounted(() => {
        write(value!);
    });

    useEventListener('storage', (e: StorageEvent) => {
        if (listenToStorageChanges) {
            if (e.key !== key) return;

            if (e.key === null) return setValue(null);

            try {
                setValue(read(e.newValue));
            } catch (e) {
                onError(e);
            }
        }
    });

    return [value, write, remove] as const;
}
