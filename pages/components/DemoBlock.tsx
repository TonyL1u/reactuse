import type { PropsWithChildren } from 'react';

export default (props: PropsWithChildren) => {
    return <div className="demo-block">{props.children}</div>;
};
