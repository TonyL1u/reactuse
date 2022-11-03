import { useEffect, useRef, useCallback } from 'react';
import { useTitle, useRouter, tryOnMounted } from 'reactuse';
import RouterLink from './routers/RouterLink';
import RouterView from './routers/RouterView';
import RouterPager from './routers/RouterPager';
import { Sandpack } from '@codesandbox/sandpack-react';
import './styles/App.scss';
import './styles/doc-demo-widget.scss';

const code = `
import { useMouse } from 'reactuse';

export default () => {
    const { x, y, sourceType } = useMouse();

    return (
        <>
            <div>x: {x}</div>
            <div>y: {y}</div>
            <div>sourceType: {sourceType}</div>
        </>
    );
};
`.trim();

function App() {
    const { onLocationChange } = useRouter();
    const { setTitle } = useTitle();

    onLocationChange(
        'pathname',
        ({ pathname }) => {
            setTitle(`${pathname.slice(1)} | ReactUse`);
        },
        { immediately: true }
    );

    return (
        <div className="tw-flex tw-flex-col tw-w-full">
            <header className="doc-header tw-h-[55px] tw-min-h-[55px] tw-flex tw-items-center tw-pl-16 tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-10 tw-bg-white" style={{ borderBottom: '1px solid #f0f0f0' }}>
                <div className="tw-text-2xl tw-font-semibold">ReactUse</div>
            </header>
            <aside className="doc-aside tw-w-[300px] tw-box-border tw-fixed tw-top-0 tw-bottom-0 tw-left-0 tw-pt-14 tw-pl-16" style={{ borderRight: '1px solid #f0f0f0' }}>
                <RouterLink />
            </aside>
            <main className="doc-content tw-flex-1 tw-flex tw-flex-col tw-pl-[300px] tw-pt-14">
                {/* <Sandpack template="react" files={{ '/App.js': code }} /> */}
                <RouterView />
                <RouterPager />
            </main>
        </div>
    );
}

export default App;
