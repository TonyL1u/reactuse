import { useState } from 'react';
import { useDebounceFn } from 'reactuse';

export default () => {
    const [value, setValue] = useState(0);
    const [count, setCount] = useState(0);

    const debounced = useDebounceFn(
        () => {
            setValue(v => v + 1);
        },
        1000,
        { maxWait: 5000 }
    );
    const handleClick = () => {
        setCount(c => c + 1);
        debounced();
    };

    return (
        <>
            <div>Clicked times: {count}</div>
            <div className="tw-mt-1">Called times: {value}</div>
            <button className="doc-demo-widget-button tw-mt-2" onClick={handleClick}>
                Click Me
            </button>
        </>
    );
};
