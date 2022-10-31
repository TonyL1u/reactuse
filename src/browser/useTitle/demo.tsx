import { useTitle } from 'reactuse';

export default () => {
    const { title, setTitle } = useTitle({ observe: true });

    return (
        <>
            <div className="note">Title</div>
            <input type="text" value={title} onChange={evt => setTitle(evt.target.value)} />
        </>
    );
};
