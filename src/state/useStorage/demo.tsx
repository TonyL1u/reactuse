import { useStorage } from 'reactuse';
import { stringify } from '@doc-utils';

interface User {
    name: string;
    age: number;
    job: string;
}

export default () => {
    const [value, write] = useStorage('reactuse-local-storage', { name: 'Tom', age: 21, job: 'teacher' } as User);
    const handleChange = <T extends keyof User>(k: T, v: User[T]) => {
        value && write({ ...value, [k]: v });
    };

    return (
        <>
            <input className="doc-demo-widget-input" type="text" value={value?.name} onChange={evt => handleChange('name', evt.target.value)} />
            <input className="doc-demo-widget-input" type="text" value={value?.age} onChange={evt => handleChange('age', +evt.target.value)} />
            <input className="doc-demo-widget-input" type="text" value={value?.job} onChange={evt => handleChange('job', evt.target.value)} />
            {value && <pre>{stringify(value)}</pre>}
        </>
    );
};
