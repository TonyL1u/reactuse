import { useRef } from 'react';
import { useClipboard } from 'reactuse';

export default () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { copy, text } = useClipboard();
    const handleCopy = () => {
        const value = inputRef.current?.value ?? '';
        copy(value);
    };

    return (
        <>
            <div className="tw-flex tw-items-center">
                Current copied: <span className="tw-ml-1 tw-px-1 tw-rounded tw-bg-gray-100">{text}</span>
            </div>
            <div className="tw-flex tw-items-center">
                <input ref={inputRef} className="doc-demo-widget-input" type="text" />
                <button className="doc-demo-widget-button tw-ml-2" onClick={handleCopy}>
                    Copy
                </button>
            </div>
        </>
    );
};
