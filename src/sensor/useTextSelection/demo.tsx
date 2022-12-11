import { useTextSelection } from 'reactuse';
import cn from 'classnames';

export default () => {
    const { text } = useTextSelection();

    return (
        <div className="tw-flex tw-flex-col tw-h-full">
            To be, or not to be, that is the question: Whether 'this nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.
            <div className={cn('tw-flex-1 tw-p-2 tw-mt-4 tw-border-gray-400 tw-border-solid tw-border tw-rounded tw-overflow-auto tw-italic', text ? 'tw-text-green-500' : 'tw-text-gray-500')}>「 {text ? text : 'Nothing selected'} 」</div>
        </div>
    );
};
