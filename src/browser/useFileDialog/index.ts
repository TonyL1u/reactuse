import { useRef, useState } from 'react';
import { hasOwn } from '../../helper';

export interface UseFileDialogOptions {
    /**
     * @defaultValue true
     */
    multiple?: boolean;
    /**
     * @defaultValue '*'
     */
    accept?: string;
    /**
     * Select the input source for the capture file.
     */
    capture?: string;
}

export interface UseFileDialogReturn {
    readonly files: FileList | null;
    open: (localOptions?: Partial<UseFileDialogOptions>) => void;
    reset: () => void;
}

/**
 * Open file dialog with ease.
 *
 * @example
 * ```ts
 * import { useFileDialog } from 'reactuse';
 * 
 * const { files, open, reset } = useFileDialog();
 * open(); // open a file dialog
 * ```
 * @param options
 * @returns
 */
export function useFileDialog(options: UseFileDialogOptions = { multiple: true, accept: '*' }): UseFileDialogReturn {
    const [files, setFiles] = useState<FileList | null>(null);
    const input = useRef<HTMLInputElement | null>(null);

    if (document && !input.current) {
        input.current = document.createElement('input');
        input.current.type = 'file';

        input.current.onchange = (event: Event) => {
            const result = event.target as HTMLInputElement;
            setFiles(result.files);
        };
    }

    const open = (localOptions: Partial<UseFileDialogOptions> = {}) => {
        if (!input.current) return;

        const _options = { ...options, ...localOptions };
        input.current.multiple = _options.multiple!;
        input.current.accept = _options.accept!;

        if (hasOwn(_options, 'capture')) input.current.capture = _options.capture!;

        input.current.click();
    };

    const reset = () => {
        if (input.current) input.current.value = '';
        setFiles(null);
    };

    return { files, open, reset };
}
