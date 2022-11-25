import { useMagicKeys, useWatchState } from 'reactuse';
import { LogoReact } from '@doc-utils';
import cn from 'classnames';

const commonCls = 'tw-rounded-lg tw-bg-gray-100 tw-px-4 tw-py-2 tw-flex tw-justify-center tw-items-center tw-transition';
const activeCls = 'tw-bg-green-500 tw-text-white';

export default () => {
    const { r, e, a, c, t, r_e_a_c_t, shift, current } = useMagicKeys();
    useWatchState(current, v => {
        console.log([...v]);
    });

    return (
        <div className="tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-space-y-4">
            <div>Press the follow keys to test</div>
            <div className="tw-space-x-2 tw-flex">
                <div className={cn(commonCls, r && activeCls)}>R</div>
                <div className={cn(commonCls, e && activeCls)}>e</div>
                <div className={cn(commonCls, a && activeCls)}>a</div>
                <div className={cn(commonCls, c && activeCls)}>c</div>
                <div className={cn(commonCls, t && activeCls)}>t</div>
            </div>
            <div className="tw-space-x-2 tw-flex">
                <div className={cn(commonCls, shift && activeCls)}>Shift</div>
                <div className={cn(commonCls, r_e_a_c_t && activeCls)}>React</div>
            </div>
            <div className={cn('tw-transition tw-opacity-0', r_e_a_c_t && 'tw-opacity-100')} style={{ marginTop: '24px' }}>
                <LogoReact className={shift ? 'tw-animate-spin' : ''} style={{ animationDuration: '10s' }} />
            </div>
        </div>
    );
};
