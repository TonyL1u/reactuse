import { useRef, useMemo } from 'react';
import { useParallax, watchState } from 'reactuse';
import LiveEditor from './components/LiveEditor';

const code = `
import { useMouse } from 'reactuse';

export default () => {
    const { x, y, sourceType } = useMouse();

    return (
        <>
            <div>x: {x}</div>
            <div>y: {y}</div>
            <div>sourceType: {sourceType}</div>
        </>
    );
};
`.trim();

export default () => {
    const el = useRef<HTMLDivElement | null>(null);
    const { roll, tilt } = useParallax(el);
    const transform = useMemo(() => `rotateX(${roll * 2}deg) rotateY(${tilt * 2}deg)`, [roll, tilt]);

    watchState([roll, tilt], () => {
        const iframe = document.querySelector('#sandbox_iframe');
        if (iframe) {
            iframe.setAttribute('style', `transform: rotateX(${roll * 5}deg) rotateY(${tilt * 5}deg)`);
        }
    });

    return (
        <div ref={el} className="home tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-p-[18px] tw-pt-8 tw-pb-20  tw-box-border" style={{ perspective: '300px' }}>
            <div className="tw-pb-16 tw-w-full tw-flex tw-flex-col tw-items-center">
                <div className="tw-text-6xl">React Use</div>
                <div className="tw-mt-4 tw-text-gray-400 tw-tracking-[3px]">An Effective React Hooks Library</div>
            </div>
            <div className="tw-w-full tw-max-w-[800px] " style={{ transform }}>
                <LiveEditor code={code} toolbox={false} />
            </div>
        </div>
    );
};
