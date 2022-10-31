import { useRef } from 'react';
import { useElementBounding } from 'reactuse';
import { stringify } from '../../helper';

export default () => {
    const el = useRef<HTMLTextAreaElement | null>(null);
    const bounding = useElementBounding(el);

    return (
        <>
            <div className="note">Resize the box to see changes</div>
            <textarea ref={el} className="resizer" value={stringify(bounding)} readOnly disabled></textarea>
        </>
    );
};
