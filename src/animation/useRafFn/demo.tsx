import { useState } from 'react';
import { useRafFn } from 'reactuse';

export default () => {
    const [count, setCount] = useState(0);
    const { resume, pause } = useRafFn(() => {
        setCount(count + 1);
    });

    return (
        <>
            <div className="doc-demo-widget-note">{count}</div>
            <button className="doc-demo-widget-button" onClick={pause}>
                Pause
            </button>
            <button className="doc-demo-widget-button tw-ml-4" onClick={resume}>
                Resume
            </button>
        </>
    );
};
