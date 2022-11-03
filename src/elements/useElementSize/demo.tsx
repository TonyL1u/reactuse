import { useRef } from 'react';
import { useElementSize } from 'reactuse';
import { stringify } from '@doc-utils';

export default () => {
    const el = useRef<HTMLTextAreaElement | null>(null);
    const size = useElementSize(el, { box: 'border-box' });

    return (
        <>
            <div className="doc-demo-widget-note">Resize the box to see changes</div>
            <textarea className="doc-demo-widget-resizer" ref={el} value={stringify(size)} readOnly disabled></textarea>
        </>
    );
};
