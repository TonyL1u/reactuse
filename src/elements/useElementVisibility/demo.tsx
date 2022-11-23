import { useRef } from 'react';
import { useElementVisibility } from 'reactuse';

export default () => {
    const el = useRef<HTMLDivElement>(null);
    const visible = useElementVisibility(el);

    return (
        <div className="tw-w-[200vw] tw-h-[200vh]">
            <div className="doc-demo-widget-note">Scroll to see changes</div>
            <div ref={el} className="tw-p-2 tw-border-dashed tw-border-2 tw-border-black tw-shadow-lg tw-w-[50vw]">
                Target Element
            </div>
            <div className="tw-fixed tw-right-4 tw-bottom-4">
                Element is
                <strong className={visible ? 'tw-text-green-500' : 'tw-text-red-500'}> {visible ? 'inside' : 'outside'} </strong>
                the viewport
            </div>
        </div>
    );
};
