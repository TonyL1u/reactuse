import { useDeviceOrientation } from 'reactuse';
import { stringify } from '@doc-utils';

export default () => {
    const orientationState = useDeviceOrientation();

    return <div className="tw-whitespace-pre-wrap">{stringify(orientationState)}</div>;
};
