import React from 'react';
import { watchState } from 'reactuse';

const { useState } = React;

export default () => {
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(0);

    watchState(count, val => {
        setFlag(val);
    });

    return (
        <button className="doc-demo-widget-button" onClick={() => setCount(c => c + 1)}>
            {flag}
        </button>
    );
};
