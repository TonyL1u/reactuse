import { useIdle, useTimestamp } from 'reactuse';

export default () => {
    const { idle, lastActive } = useIdle(2000);
    const now = useTimestamp();

    return (
        <>
            <div>
                Idle: <span className="tw-font-bold tw-text-green-500">{String(idle)}</span>
            </div>
            <div>
                Inactive for: <span className="tw-font-bold tw-text-orange-500">{~~((now - lastActive) / 1000)} s</span>
            </div>
        </>
    );
};
