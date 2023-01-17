import { useState } from 'react';
import { useTimeoutFn } from 'reactuse';

export default () => {
    const [disabled, setDisabled] = useState(true);
    useTimeoutFn(() => {
        setDisabled(false);
    }, 3000);

    return (
        <button className="doc-demo-widget-button" disabled={disabled}>
            Wait for 3s
        </button>
    );
};
