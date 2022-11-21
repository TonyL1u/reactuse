import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import { useWatchState } from 'reactuse';

const watchFn = vi.fn();
const Component = () => {
    const [_, change] = useState(0);

    const { pause, resume } = useWatchState(_, watchFn);

    return (
        <div>
            <button onClick={() => change(_ => _ + 1)}>Click Me</button>
            <button onClick={pause}>Pause</button>
            <button onClick={resume}>Resume</button>
        </div>
    );
};

describe('useWatchState', () => {
    test('should be defined', () => {
        expect(useWatchState).toBeDefined();
    });

    test('should work', () => {
        render(<Component />);
        const button = screen.getByRole('button', { name: /Click Me/i });

        fireEvent.click(button);
        fireEvent.click(button);
        fireEvent.click(button);
        expect(watchFn).toBeCalledTimes(3);
    });

    test('should work with pause and resume', () => {
        render(<Component />);

        const button = screen.getByRole('button', { name: /Click Me/i });
        fireEvent.click(button);
        expect(watchFn).toBeCalled();

        // pause watch
        const pauseBtn = screen.getByRole('button', { name: /Pause/i });
        fireEvent.click(pauseBtn);
        fireEvent.click(button);
        expect(watchFn).toBeCalledTimes(1);

        // resume watch
        const resumeBtn = screen.getByRole('button', { name: /Resume/i });
        fireEvent.click(resumeBtn);
        fireEvent.click(button);
        expect(watchFn).toBeCalledTimes(2);
    });
});
