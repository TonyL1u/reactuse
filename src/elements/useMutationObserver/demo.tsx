import { useState, useRef } from 'react';
import { useMutationObserver } from 'reactuse';

export default () => {
    const el = useRef<HTMLDivElement>(null);
    const [bgClass, setBgClass] = useState('tw-bg-green-400');
    const [border, setBorder] = useState(0);

    useMutationObserver(
        el,
        mutations => {
            console.log(`Mutation Attribute: ${mutations[0].attributeName}`);
        },
        { attributes: true }
    );

    return (
        <>
            <div className="doc-demo-widget-note">Click the button and open the Console to see outputs</div>
            <button className="doc-demo-widget-button" onClick={() => setBorder(8)}>
                Change Style
            </button>
            <button className="doc-demo-widget-button tw-ml-2" onClick={() => setBgClass('tw-bg-blue-400')}>
                Change Class
            </button>
            <div ref={el} className={`tw-p-2 tw-mt-2 ${bgClass}`} style={{ borderRadius: border }}>
                I' m a DIV Element
            </div>
        </>
    );
};
