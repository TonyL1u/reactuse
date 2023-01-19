import { useCounter } from 'reactuse';

export default () => {
    const { count, inc, dec, set, reset } = useCounter();

    return (
        <>
            <div>Count: {count}</div>
            <div className="tw-flex tw-flex-wrap tw-content-between tw-mt-2">
                <button className="doc-demo-widget-button tw-mr-4 tw-mb-4" onClick={() => inc()}>
                    Increase
                </button>
                <button className="doc-demo-widget-button tw-mr-4 tw-mb-4" onClick={() => dec()}>
                    Decrease
                </button>
                <button className="doc-demo-widget-button tw-mr-4 tw-mb-4" onClick={() => inc(5)}>
                    Increase (+5)
                </button>
                <button className="doc-demo-widget-button tw-mr-4 tw-mb-4" onClick={() => dec(5)}>
                    Decrease (-5)
                </button>
                <button className="doc-demo-widget-button tw-mr-4 tw-mb-4" onClick={() => set(100)}>
                    Set (100)
                </button>
                <button className="doc-demo-widget-button tw-mr-4 tw-mb-4" onClick={() => reset()}>
                    Reset
                </button>
            </div>
        </>
    );
};
