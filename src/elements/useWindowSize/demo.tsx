import { useWindowSize } from 'reactuse';

export default () => {
    const { width, height } = useWindowSize();

    return (
        <>
            <div className="doc-demo-widget-note">Resize your browser to see changes</div>
            {width} * {height}
        </>
    );
};
