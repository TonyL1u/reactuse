import { CodeSlash, Refresh, OpenOutline } from '@ricons/ionicons5';
import { repository } from '@/package.json';
import * as monaco from 'monaco-editor';
import type { RefObject, ReactElement } from 'react';

interface ToolButtonProps {
    onClick: () => void;
    icon: ReactElement;
    text?: string;
}

const ToolButton = ({ onClick, icon, text }: ToolButtonProps) => {
    return (
        <button className="tw-text-sm tw-inline-flex tw-items-center hover:tw-text-green-500 tw-duration-100 tw-ease-in tw-transition tw-border-none tw-bg-transparent tw-cursor-pointer" onClick={onClick} type="button">
            {icon} {text ?? ''}
        </button>
    );
};

export default function Toolbox(props: { code: string; editor: RefObject<monaco.editor.IStandaloneCodeEditor | null>; reset: () => void }) {
    const { code, editor, reset } = props;

    const handleFormat = async () => {
        editor.current?.getAction('editor.action.formatDocument').run();
    };

    const handleReset = () => {
        editor.current?.setValue(code);
        reset();
    };

    const handleOpenGithub = () => {
        window.open(`${repository.url}/blob/master/${''}`);
    };

    return (
        <div className="toolbox-container tw-flex tw-justify-end tw-items-center tw-px-2 tw-h-8 tw-w-full tw-box-border">
            <ToolButton icon={<CodeSlash height={14} width={14} />} onClick={handleFormat} />
            <ToolButton icon={<Refresh height={14} width={14} />} onClick={handleReset} />
            <ToolButton icon={<OpenOutline height={14} width={14} />} onClick={handleOpenGithub} />
        </div>
    );
}
