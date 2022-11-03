interface Props {
    code: string;
    demo: any;
}

export default (props: Props) => {
    return <div dangerouslySetInnerHTML={{ __html: decodeURI(props.code) }}></div>;
};
