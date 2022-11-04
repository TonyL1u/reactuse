import { useRef, forwardRef, useImperativeHandle } from 'react';
import { PlayOutline } from '@ricons/ionicons5';
import './styles/loading-cube.scss';

const LoadingCube = () => {
    return (
        <div className="cube-wrapper">
            <div className="cube">
                <div className="sides">
                    <div className="top" />
                    <div className="right" />
                    <div className="bottom" />
                    <div className="left" />
                    <div className="front" />
                    <div className="back" />
                </div>
            </div>
        </div>
    );
};

const ErrorDisplayPanel = (props: { error: string }) => {
    return (
        <div className="tw-absolute tw-top-6 tw-bottom-6 tw-left-6 tw-right-6 tw-bg-white tw-rounded-lg tw-z-20 tw-border-red-500 tw-border-solid tw-border-2 tw-p-6 tw-overflow-auto">
            <span className="tw-text-red-600 tw-text-2xl">Error</span>
            <div className="tw-mt-3 tw-tracking-wide">{props.error}</div>
        </div>
    );
};

export default forwardRef((props: { runtimeError: string; loading: boolean; run: () => void }, ref) => {
    const { runtimeError, loading, run } = props;
    const container = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => {
        return { container: container.current };
    });

    return (
        <>
            <div ref={container} className="preview-container tw-flex-1 tw-p-6 tw-overflow-auto tw-flex tw-relative">
                {loading && <LoadingCube />}
                {runtimeError && <ErrorDisplayPanel error={String(runtimeError)} />}
                {!loading && <PlayOutline width={16} height={16} className="run-button tw-absolute tw-bottom-8 tw-right-8 tw-cursor-pointer tw-opacity-0 tw-z-30 tw-transition" onClick={() => run()} />}
            </div>
        </>
    );
});
