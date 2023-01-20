import { useCycleList } from 'reactuse';

export default () => {
    const { current, next, prev, seek } = useCycleList(['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'] as const);

    return (
        <>
            <div className="tw-font-bold tw-mb-2">{current}</div>
            <button className="doc-demo-widget-button tw-mr-4" onClick={() => next()}>
                Next
            </button>
            <button className="doc-demo-widget-button tw-mr-4" onClick={() => prev()}>
                Prev
            </button>
            <button className="doc-demo-widget-button tw-mr-4" onClick={() => seek(4)}>
                Seek (Fri)
            </button>
        </>
    );
};
