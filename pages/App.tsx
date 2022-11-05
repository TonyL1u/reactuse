import { useMemo } from 'react';
import { useTitle, useRouter } from 'reactuse';
import { useNavigate } from 'react-router-dom';
import RouterLink from './routers/RouterLink';
import RouterView from './routers/RouterView';
import RouterPager from './routers/RouterPager';
import './styles/App.scss';
import './styles/doc-demo-widget.scss';

function App() {
    const { onLocationChange, pathname } = useRouter();
    const { setTitle } = useTitle();
    const navigate = useNavigate();
    const isHomePage = useMemo(() => pathname === '/', [pathname]);

    onLocationChange(
        'pathname',
        ({ pathname }) => {
            !isHomePage && setTitle(`${pathname.slice(1)} | ReactUse`);
        },
        { immediately: true }
    );

    return (
        <div className="tw-flex tw-flex-col tw-w-full">
            <header className="doc-header tw-h-[55px] tw-min-h-[55px] tw-flex tw-items-center tw-pl-16 tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-50 " style={{ borderBottom: '1px solid #f0f0f0' }}>
                <div className="tw-text-2xl tw-font-semibold tw-cursor-pointer" onClick={() => navigate('/')}>
                    ReactUse
                </div>
            </header>
            {!isHomePage && (
                <aside className="doc-aside tw-w-[300px] tw-box-border tw-fixed tw-top-0 tw-bottom-0 tw-left-0 tw-pt-14 tw-pl-16" style={{ borderRight: '1px solid #f0f0f0' }}>
                    <RouterLink />
                </aside>
            )}
            <main className="doc-content tw-flex-1 tw-flex tw-flex-col tw-pt-14" style={{ paddingLeft: isHomePage ? '0px' : '300px' }}>
                <RouterView />
                {!isHomePage && <RouterPager />}
            </main>
        </div>
    );
}

export default App;
