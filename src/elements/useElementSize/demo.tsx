import { useRef } from 'react';
import { useElementSize } from 'reactuse';
import { stringify } from '../../helper';

export default () => {
    const el = useRef<HTMLTextAreaElement | null>(null);
    const size = useElementSize(el, { box: 'border-box' });

    return (
        <>
            <div className="note">Resize the box to see changes</div>
            <textarea ref={el} className="resizer" value={stringify(size)} readOnly disabled></textarea>
        </>
    );
};
