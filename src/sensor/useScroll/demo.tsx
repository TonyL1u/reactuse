import { useRef } from 'react';
import { useScroll } from 'reactuse';

export default () => {
    const el = useRef<HTMLDivElement>(null);
    const { x, y, isScrolling, arrivedState } = useScroll(el);

    return (
        <div className="tw-flex tw-h-full">
            <div ref={el} className="tw-w-[200px] tw-h-[200px] tw-overflow-auto tw-m-auto tw-bg-gray-100 tw-rounded">
                <div className="tw-w-[500px] tw-h-[500px]"></div>
            </div>
            <div className="tw-flex-1 tw-ml-4">
                <div>X Position: {x}</div>
                <div>Y Position: {y}</div>
                <div>isScrolling: {String(isScrolling)}</div>
                <div>Top Arrived: {String(arrivedState.top)}</div>
                <div>Left Arrived: {String(arrivedState.left)}</div>
                <div>Bottom Arrived: {String(arrivedState.bottom)}</div>
                <div>Right Arrived: {String(arrivedState.right)}</div>
            </div>
        </div>
    );
};
