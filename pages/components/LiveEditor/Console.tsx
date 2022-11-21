import { useState, useRef } from 'react';
import { useWatchState } from 'reactuse';
import { TerminalOutline, Ban } from '@ricons/ionicons5';

export type Logs = {
    timestamp: number;
    message: string;
}[];

export default (props: { logs: Logs; clear: () => void }) => {
    const messagePanel = useRef<HTMLDivElement>(null);
    const { logs, clear } = props;
    const [collapsed, setCollapsed] = useState(true);

    useWatchState(logs, () => {
        if (messagePanel.current) {
            messagePanel.current.scrollTop = 9999;
        }
    });

    return (
        <div className="console-container tw-text-sm tw-w-full tw-box-border tw-relative">
            <div className="tw-h-8 tw-flex tw-items-center tw-pl-6 tw-cursor-pointer" onClick={() => setCollapsed(c => !c)}>
                <TerminalOutline width={14} height={14} style={{ marginRight: '6px' }} />
                Console
            </div>
            {!collapsed && (
                <div ref={messagePanel} className="tw-max-h-40 tw-px-6 tw-overflow-auto tw-relative" style={{ borderTop: '1px solid #f0f0f0' }}>
                    {logs.length > 0 ? (
                        logs.map(({ timestamp, message }) => (
                            <div key={timestamp} className="tw-py-2 tw-flex tw-items-start tw-leading-4">
                                <span className="tw-text-gray-400">{new Date(timestamp).toLocaleString()}</span>
                                <pre className="console-output-message tw-ml-4 tw-flex-1 tw-font-bold tw-truncate tw-whitespace-pre-wrap tw-my-0" style={{ fontFamily: 'inherit' }}>
                                    {message}
                                </pre>
                            </div>
                        ))
                    ) : (
                        <div className="tw-p-4 tw-text-sm tw-text-gray-400 tw-flex tw-items-center tw-justify-center">Nothing Output</div>
                    )}
                </div>
            )}
            {logs.length > 0 && !collapsed && <Ban width={14} height={14} color="#999" className="tw-absolute tw-bottom-2 tw-right-2 tw-cursor-pointer" onClick={clear} />}
        </div>
    );
};
