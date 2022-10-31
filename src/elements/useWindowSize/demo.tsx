import { useWindowSize } from 'reactuse';

export default () => {
    const { width, height } = useWindowSize();

    return (
        <>
            <div className="note">Resize your browser to see changes</div>
            {width} * {height}
        </>
    );
};
