import { useState } from 'react';
import { watchState } from 'reactuse';

export default () => {
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(0);

    watchState(count, val => {
        setFlag(val);
    });

    return <button onClick={() => setCount(c => c + 1)}>{flag}</button>;
};
