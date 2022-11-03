import { useTitle } from 'reactuse';

export default () => {
    const { title, setTitle } = useTitle({ observe: true });

    return (
        <>
            <div className="doc-demo-widget-note">Title</div>
            <input className="doc-demo-widget-input" type="text" value={title} onChange={evt => setTitle(evt.target.value)} />
        </>
    );
};
