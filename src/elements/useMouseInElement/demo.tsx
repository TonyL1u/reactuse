import { useRef } from 'react';
import { useMouseInElement } from 'reactuse';
import { stringify } from '@doc-utils';

export default () => {
    const el = useRef<HTMLTextAreaElement | null>(null);
    const state = useMouseInElement(el);

    return (
        <>
            <div className="doc-demo-widget-note">Move your cursor to see changes</div>
            <textarea className="doc-demo-widget-resizer" ref={el} value={stringify(state)} readOnly disabled></textarea>
        </>
    );
};
