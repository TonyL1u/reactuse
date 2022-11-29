import { useState } from 'react';
import { useKeyStroke } from 'reactuse';

export default () => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    useKeyStroke('ArrowUp', e => {
        e.preventDefault();
        setY(y => y - 10);
    });
    useKeyStroke('ArrowDown', e => {
        e.preventDefault();
        setY(y => y + 10);
    });
    useKeyStroke('ArrowLeft', e => {
        e.preventDefault();
        setX(x => x - 10);
    });
    useKeyStroke('ArrowRight', e => {
        e.preventDefault();
        setX(x => x + 10);
    });

    return (
        <div className="tw-h-full tw-w-full tw-flex tw-flex-col tw-justify-center tw-items-center">
            <div className="doc-demo-widget-note">Press arrow keys to move the ball.</div>
            <div className="tw-h-4 tw-w-4 tw-rounded-full tw-bg-gray-500" style={{ transform: `translate3d(${x}px, ${y}px, 0px)` }}></div>
        </div>
    );
};
