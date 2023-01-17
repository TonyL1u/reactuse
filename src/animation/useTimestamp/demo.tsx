import { useTimestamp } from 'reactuse';

export default () => {
    const now = useTimestamp();

    return now;
};
