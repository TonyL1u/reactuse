import { useState, useRef } from 'react';
import { useWatchRef } from 'reactuse';

export default () => {
    const el = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(true);

    useWatchRef(el, val => {
        console.log(val ? 'element mounted' : 'element unmounted');
    });

    return (
        <>
            <button className="doc-demo-widget-button" onClick={() => setShow(!show)}>
                Click Me
            </button>
            {show && (
                <div ref={el} className="tw-p-2 tw-mt-2 tw-bg-green-400">
                    I' m a DIV element
                </div>
            )}
        </>
    );
};
