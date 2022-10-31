import { useMounted } from 'reactuse';

export default () => {
    const isMounted = useMounted();

    return <div>{JSON.stringify(isMounted)}</div>;
};
