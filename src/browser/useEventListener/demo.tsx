import { useRef } from 'react';
import { useEventListener } from 'reactuse';

export default () => {
    const btn = useRef<HTMLButtonElement>(null);
    useEventListener(btn, 'click', evt => {
        console.log(evt.target);
    });

    return (
        <button ref={btn} className="doc-demo-widget-button">
            Click Me
        </button>
    );
};
