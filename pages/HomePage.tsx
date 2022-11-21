import { useRef, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParallax, useWatchState } from 'reactuse';
import LiveEditor from './components/LiveEditor';
import './styles/HomePage.scss';

const Demos = import.meta.glob<string>('/src/**/**/demo.tsx', { eager: true, as: 'raw' });
const sources = Object.entries(Demos).map(([key, code]) => {
    const [_, category, name] = key.match(/\/src\/(.*)\/(.*)\/demo.tsx/)!;
    return { name, code };
});
function getRandomDemo() {
    return sources[Math.floor(Math.random() * sources.length)];
}
const initialDemo = getRandomDemo();

export default () => {
    const { code: initialCode, name: initialPath } = initialDemo;
    const [code, changeCode] = useState(initialCode);
    const startPath = useRef(`/${initialPath}`);
    const el = useRef<HTMLDivElement | null>(null);
    const { roll, tilt } = useParallax(el);
    const navigate = useNavigate();
    const transform = useMemo(() => `rotateX(${roll * 2}deg) rotateY(${tilt * 2}deg)`, [roll, tilt]);

    useWatchState([roll, tilt], () => {
        const iframe = document.querySelector('#sandbox_iframe');
        if (iframe) {
            iframe.setAttribute('style', `transform: rotateX(${roll * 5}deg) rotateY(${tilt * 5}deg)`);
        }
    });

    const shuffleDemo = () => {
        const { name, code } = sources[Math.floor(Math.random() * sources.length)];
        startPath.current = `/${name}`;
        changeCode(code);
    };

    return (
        <div ref={el} className="home tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-p-[18px] tw-pt-6 tw-pb-20  tw-box-border" style={{ perspective: '300px' }}>
            <div className="tw-pb-16 tw-w-full tw-flex tw-flex-col tw-items-center">
                <div className="tw-text-6xl tw-cursor-pointer hover:tw-text-emerald-500 tw-transition" onClick={() => navigate(startPath.current)}>
                    {/* React Use */}
                    <svg id="title" viewBox="0 0 320 100">
                        <text x="8%" y="70%">
                            React Use
                        </text>
                    </svg>
                </div>
                <div className="tw-mt-[-8px] tw-text-gray-400 tw-tracking-[3px]">An Effective React Hooks Library</div>
                <div className="tw-flex tw-mt-6">
                    <button className="tw-text-[#61dafb] tw-px-6 tw-py-2 tw-bg-transparent tw-rounded-[48px] tw-text-xl tw-cursor-pointer hover:tw-shadow-xl tw-transition" style={{ border: '1px solid #61dafb' }} onClick={() => navigate(startPath.current)}>
                        Get Started
                    </button>
                    <button className="tw-text-white tw-px-6 tw-py-2 tw-bg-[#61dafb] hover:tw-bg-[#61dafbd2] tw-rounded-[48px] tw-text-xl tw-ml-6 tw-border-transparent tw-cursor-pointer c" onClick={shuffleDemo}>
                        Shuffle Hooks
                    </button>
                </div>
            </div>
            <div className="tw-w-full tw-max-w-[800px] " style={{ transform }}>
                <LiveEditor code={code} toolbox={false} />
            </div>
        </div>
    );
};
