import { useStorage } from 'reactuse';

export default () => {
    const [value, write] = useStorage('storage-test', null);

    return (
        <>
            <input className="doc-demo-widget-input" type="text" value={value || ''} onChange={evt => write(evt.target.value)} />
            {value}
        </>
    );
};
