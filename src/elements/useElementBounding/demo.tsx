import { useRef } from 'react';
import { useElementBounding } from 'reactuse';
import { stringify } from '@doc-utils';

export default () => {
    const el = useRef<HTMLTextAreaElement | null>(null);
    const bounding = useElementBounding(el);

    return (
        <>
            <div className="doc-demo-widget-note">Resize the box to see changes</div>
            <textarea className="doc-demo-widget-resizer" ref={el} value={stringify(bounding)} readOnly disabled></textarea>
        </>
    );
};
