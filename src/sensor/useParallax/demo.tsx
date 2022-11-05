import { useRef } from 'react';
import { useParallax } from 'reactuse';

export default () => {
    const el = useRef<HTMLDivElement | null>(null);
    const { roll, tilt } = useParallax(el);

    return (
        <div ref={el} className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center" style={{ perspective: '300px' }}>
            <div className="tw-w-32 tw-h-40 tw-rounded tw-shadow-lg" style={{ border: '1px solid #cdcdcd', transform: `rotateX(${roll * 30}deg) rotateY(${tilt * 30}deg)` }}></div>
        </div>
    );
};
