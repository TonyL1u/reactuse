import { useRef } from 'react';
import { useResizeObserver } from 'reactuse';

export default () => {
    const target = useRef<HTMLTextAreaElement>(null);

    useResizeObserver(target, ([entry]) => {
        console.log(entry.contentRect);
    });

    return (
        <>
            <div className="doc-demo-widget-note">Resize the box and open the Console to see changes</div>
            <textarea className="doc-demo-widget-resizer" ref={target} readOnly disabled></textarea>
        </>
    );
};
