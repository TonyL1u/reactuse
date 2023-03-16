import { useFileDialog } from 'reactuse';

export default () => {
    const { files, open, reset } = useFileDialog();

    return (
        <>
            <div className="tw-flex">
                <button className="doc-demo-widget-button" onClick={() => open()}>
                    Select files
                </button>
                <button className="doc-demo-widget-button tw-ml-4" onClick={() => reset()}>
                    Reset
                </button>
            </div>
            {!!files && (
                <>
                    <div className="tw-mt-2">
                        You have selected <span className="tw-font-bold">{files.length} files</span>
                    </div>
                    <ul>
                        {[...files].map(({ name }) => {
                            return <li key={name}>{name}</li>;
                        })}
                    </ul>
                </>
            )}
        </>
    );
};
