import { useMouse } from 'reactuse';

export default () => {
    const { x, y, sourceType } = useMouse();

    return (
        <>
            <div>x: {x}</div>
            <div>y: {y}</div>
            <div>sourceType: {sourceType}</div>
        </>
    );
};
