# useFileDialog

Open file dialog with ease.

## Usage

```ts
import { useFileDialog } from 'reactuse';

const { files, open, reset } = useFileDialog();
open(); // open a file dialog
```

## Type Declarations

```ts
interface UseFileDialogOptions {
    /**
     * @defaultValue '*'
     */
    accept?: string;
    /**
     * Select the input source for the capture file.
     */
    capture?: string;
    /**
     * @defaultValue true
     */
    multiple?: boolean;
}
interface UseFileDialogReturn {
    readonly files: FileList | null;
    open: (localOptions?: Partial<UseFileDialogOptions>) => void;
    reset: () => void;
}
declare function useFileDialog(options?: UseFileDialogOptions): UseFileDialogReturn;
```

## Params

|  Name   |          Type          | Description | Optional |
| :-----: | :--------------------: | :---------: | :------: |
| options | `UseFileDialogOptions` |      -      |   true   |
