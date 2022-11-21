import { useState } from 'react';
import { useWatchState } from 'reactuse';

export default () => {
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(0);

    useWatchState(count, val => {
        setFlag(val);
    });

    return (
        <button className="doc-demo-widget-button" onClick={() => setCount(c => c + 1)}>
            {flag}
        </button>
    );
};
