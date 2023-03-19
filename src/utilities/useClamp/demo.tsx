import { useState } from 'react';
import { useClamp } from 'reactuse';

export default () => {
    const [range, setRange] = useState([0, 10]);
    const [min, max] = range;
    const [value, setValue] = useClamp(0, min, max);

    return (
        <>
            min:
            <input className="doc-demo-widget-input" type="text" value={min} onChange={evt => setRange(r => [+evt.target.value, r[1]])} />
            max:
            <input className="doc-demo-widget-input" type="text" value={max} onChange={evt => setRange(r => [r[0], +evt.target.value])} />
            value: {value}
            <div className="tw-flex tw-flex-wrap tw-content-between tw-mt-2">
                <button className="doc-demo-widget-button tw-mr-4 tw-mb-4" onClick={() => setValue(v => v - 1)}>
                    -1
                </button>
                <button className="doc-demo-widget-button tw-mr-4 tw-mb-4" onClick={() => setValue(v => v + 1)}>
                    +1
                </button>
            </div>
        </>
    );
};
