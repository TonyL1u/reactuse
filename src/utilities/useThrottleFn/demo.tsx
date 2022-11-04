import { useState } from 'react';
import { useThrottleFn } from 'reactuse';

export default () => {
    const [value, setValue] = useState(0);
    const [count, setCount] = useState(0);

    const throttled = useThrottleFn(() => {
        setValue(v => v + 1);
    }, 1000);
    const handleClick = () => {
        setCount(c => c + 1);
        throttled();
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
