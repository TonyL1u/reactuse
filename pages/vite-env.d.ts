/// <reference types="vite/client" />
declare module '*.md' {
    // When "Mode.React" is requested. VFC could take a generic like React.VFC<{ MyComponent: TypeOfMyComponent }>
    import React from 'react';
    const Component: React.FC;

    // Modify below per your usage
    export default Component;
}
