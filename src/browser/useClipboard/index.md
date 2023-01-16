# useClipboard

Reactive [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API). Provides the ability to respond to clipboard commands (cut, copy, and paste) as well as to asynchronously read from and write to the system clipboard. Access to the contents of the clipboard is gated behind the [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API). Without user permission, reading or altering the clipboard contents is not permitted.

## Usage

## Type Declarations

```ts
declare function useClipboard(options?: UseClipboardOptions): {
    isSupported: boolean;
    copy: (value?: string) => Promise<void>;
    text: string;
    copied: boolean;
};
```

## Params

|  Name   |         Type          | Description | Optional |
| :-----: | :-------------------: | :---------: | :------: |
| options | `UseClipboardOptions` |      -      |   true   |