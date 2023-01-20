import { useState, useRef, useMemo } from 'react';
import { useInfiniteScroll } from 'reactuse';
import { sleep } from '@doc-utils';

function createSeriesNumber(length: number, offset = 0) {
    return [...Array(length)].map((_, index) => index + offset);
}

export default () => {
    const [data, setData] = useState<number[]>(createSeriesNumber(10));
    const el = useRef<HTMLDivElement>(null);
    const renderList = useMemo(() => {
        return data.map(i => (
            <div key={i} className="tw-bg-gray-200 tw-rounded tw-p-2 tw-flex tw-items-center">
                {i}
            </div>
        ));
    }, [data]);
    const isLoading = useInfiniteScroll(el, async () => {
        await sleep(1000);
        setData([...data, ...createSeriesNumber(10, data.length)]);
    });

    return (
        <div className="tw-w-full tw-h-full tw-flex tw-justify-center">
            <div ref={el} className="tw-h-full tw-overflow-auto tw-w-[50%] tw-bg-gray-100 tw-rounded tw-p-2 tw-box-border tw-space-y-2">
                {renderList}
                {isLoading && <div className="tw-flex tw-justify-center tw-text-xs">加载中...</div>}
            </div>
        </div>
    );
};
