import { useMounted } from 'reactuse';

export default () => {
    const isMounted = useMounted();

    return <div>{String(isMounted)}</div>;
};
