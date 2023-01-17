import { useState } from 'react';
import { useTimeoutFn } from '../../animation/useTimeoutFn';
import { useSupported } from '../../shared/useSupported';

export interface UseClipboardOptions {
    /**
     * Initial copying source text
     *
     * @defaultValue ''
     */
    source?: string;
    /**
     * Fall back to lower api when the Clipboard API {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#the_time_origin} not supported
     */
    legacy?: boolean;
    copiedDelay?: number;
}

export interface UseClipboardReturn {
    isSupported: boolean;
    copy: (source?: string) => void;
    text: string;
    copied: boolean;
}

/**
 * Reactive [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API).
 * Provides the ability to respond to clipboard commands (cut, copy, and paste) as well as to asynchronously read from and write to the system clipboard.
 * Access to the contents of the clipboard is gated behind the [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API).
 * Without user permission, reading or altering the clipboard contents is not permitted.
 *
 * @param options -
 * @returns
 */
export function useClipboard(options: UseClipboardOptions = {}) {
    const { source = '', legacy = true, copiedDelay = 1000 } = options;
    const [text, setText] = useState('');
    const [copied, setCopied] = useState(false);
    const isSupported = useSupported(() => navigator && 'clipboard' in navigator);
    const timeout = useTimeoutFn(() => setCopied(false), copiedDelay);
    const copy = async (value = source) => {
        if (isSupported) {
            await navigator.clipboard.writeText(value);
        } else if (legacy) {
            legacyCopy(value);
        }

        setText(value);
        setCopied(true);
        timeout.start();
    };

    const legacyCopy = (value: string) => {
        const ta = document.createElement('textarea');
        ta.value = value ?? '';
        ta.style.position = 'absolute';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
    };

    return { isSupported, copy, text, copied };
}
