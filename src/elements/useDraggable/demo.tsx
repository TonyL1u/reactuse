import { useRef } from 'react';
import { useDraggable } from 'reactuse';

export default () => {
    const el = useRef<HTMLDivElement>(null);
    const { style, isDragging } = useDraggable(el);

    return (
        <div ref={el} className="tw-w-40 tw-h-16 tw-rounded tw-shadow-lg tw-flex tw-flex-col tw-items-center tw-justify-center tw-cursor-move tw-select-none tw-bg-white" style={style}>
            <div>Drag me!</div>
            <div className="tw-text-xs tw-text-[#666] tw-mt-1">{isDragging ? '🚀 Dragging...' : ''}</div>
        </div>
    );
};
