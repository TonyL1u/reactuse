import { useToggle } from 'reactuse';

export default () => {
    const [value, toggle] = useToggle('ON' as const, 'OFF' as const);

    return (
        <>
            <div>Value: {value}</div>
            <div className="tw-flex tw-flex-wrap tw-content-between tw-mt-2">
                <button className="doc-demo-widget-button tw-mr-4 tw-mb-4" onClick={() => toggle()}>
                    Toggle
                </button>
                <button className="doc-demo-widget-button tw-mr-4 tw-mb-4" onClick={() => toggle('ON')}>
                    Set ON
                </button>
                <button className="doc-demo-widget-button tw-mr-4 tw-mb-4" onClick={() => toggle('OFF')}>
                    Set OFF
                </button>
            </div>
        </>
    );
};
