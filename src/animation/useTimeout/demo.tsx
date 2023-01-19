import { useTimeout } from 'reactuse';
import cn from 'classnames';

export default () => {
    const { ready } = useTimeout(2000);

    return <div className={cn('tw-font-bold', ready ? 'tw-text-green-500' : 'tw-text-red-500')}>{ready ? 'Ready!' : 'Not Ready'}</div>;
};
