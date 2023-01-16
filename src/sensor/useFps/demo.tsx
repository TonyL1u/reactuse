import { useFps } from 'reactuse';

export default () => {
    const fps = useFps();

    return fps;
};
