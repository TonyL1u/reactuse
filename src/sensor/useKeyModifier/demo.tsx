import { useKeyModifier } from 'reactuse';
import cn from 'classnames';

const commonCls = 'tw-rounded-lg tw-bg-gray-100 tw-p-2';
const activeCls = 'tw-text-white tw-bg-green-500';

export default () => {
    const Alt = useKeyModifier('Alt');
    const Shift = useKeyModifier('Shift');
    const Control = useKeyModifier('Control');

    return (
        <>
            <div className="tw-grid tw-grid-cols-3 tw-gap-x-4">
                <div className={cn(commonCls, Alt && activeCls)}>Alt</div>
                <div className={cn(commonCls, Shift && activeCls)}>Shift</div>
                <div className={cn(commonCls, Control && activeCls)}>Control</div>
            </div>
            <div className=" tw-text-center tw-mt-6">Press corresponding key to test.</div>
        </>
    );
};
