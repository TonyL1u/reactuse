import { useRef, useMemo } from 'react';
import { useParallax, watchState } from 'reactuse';
import LiveEditor from './components/LiveEditor';

const code = `
import { useMouse } from 'reactuse';
import { stringify } from '@doc-utils';

export default () => {
    const mouseState = useMouse();

    return <div className="tw-whitespace-pre-wrap">{stringify(mouseState)}</div>;
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
        <div ref={el} className="tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center" style={{ perspective: '300px' }}>
            <div className="tw-pt-24 tw-pb-16 tw-w-full tw-flex tw-flex-col tw-items-center">
                <div className="tw-text-6xl tw-font-semibold">React Use</div>
                <div className="tw-mt-4 tw-text-gray-400">An effective React hooks library</div>
            </div>
            <div className="tw-w-[50%] tw-max-w-[1000px]" style={{ transform }}>
                <LiveEditor code={code} toolbox={false} />
            </div>
        </div>
    );
};
