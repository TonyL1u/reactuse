import { useState } from 'react';
import { TerminalOutline, ChevronDown } from '@ricons/ionicons5';

const ConsolePanel = () => {
    const data = [
        {
            time: '11:23:05',
            msg: '123'
        },
        {
            time: '12:59:05',
            msg: '666'
        },
        {
            time: '01:23:05',
            msg: 'ok'
        },
        {
            time: '17:23:05',
            msg: 'ok'
        },
        {
            time: '11:23:06',
            msg: 'ok'
        }
    ];

    return (
        <div className="tw-h-40 tw-px-6 tw-overflow-auto" style={{ borderTop: '1px solid #f0f0f0' }}>
            {data.map(({ time, msg }) => (
                <div key={time} className="tw-py-2 tw-flex">
                    {time}
                    <div className="tw-ml-4 tw-font-bold">{msg}</div>
                </div>
            ))}
        </div>
    );
};

export default () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="console-container tw-text-sm tw-w-full tw-box-border">
            <div className="tw-h-8 tw-flex tw-items-center tw-pl-6 tw-cursor-pointer" onClick={() => setCollapsed(c => !c)}>
                <TerminalOutline width={14} height={14} style={{ marginRight: '6px' }} />
                Console
            </div>
            {!collapsed && <ConsolePanel />}
        </div>
    );
};
