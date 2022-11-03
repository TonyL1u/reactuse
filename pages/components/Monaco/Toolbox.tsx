import { useContext } from 'react';
import { EditorContext } from './context';
import { IconRestart } from '../Icon/IconRestart';
import { IconNewPage } from '../Icon/IconNewPage';
import { IconCodeBlock } from '../Icon/IconCodeBlock';
import type { ReactElement } from 'react';

interface ToolButtonProps {
    onClick: () => void;
    icon: ReactElement;
    text: string;
}

const ToolButton = ({ onClick, icon, text }: ToolButtonProps) => {
    return (
        <button className="tw-text-sm tw-inline-flex tw-items-center hover:tw-text-green-500 tw-duration-100 tw-ease-in tw-transition tw-border-none tw-bg-transparent tw-cursor-pointer tw-px-1 tw-ml-1" onClick={onClick} type="button">
            {icon} {text}
        </button>
    );
};

export default function Toolbox() {
    const { initialCode, editor } = useContext(EditorContext);

    const handleFormat = async () => {
        editor.current?.getAction('editor.action.formatDocument').run();
    };

    const handleReset = () => {
        editor.current?.setValue(initialCode);
    };

    return (
        <div className="toolbox-container tw-flex tw-justify-end tw-items-center tw-px-2 tw-absolute tw-top-0 tw-h-8 tw-w-full tw-box-border ">
            <ToolButton text="" icon={<IconCodeBlock className="tw-text-xs tw-inline tw-relative" />} onClick={handleFormat} />
            <ToolButton text="" icon={<IconRestart className="tw-text-base tw-inline tw-relative" />} onClick={handleReset} />
            <ToolButton text="" icon={<IconNewPage className="tw-inline tw-relative" />} onClick={handleFormat} />
        </div>
    );
}
