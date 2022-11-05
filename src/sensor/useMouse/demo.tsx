import { useMouse } from 'reactuse';
import { stringify } from '@doc-utils';

export default () => {
    const mouseState = useMouse();

    return <div className="tw-whitespace-pre-wrap">{stringify(mouseState)}</div>;
};
