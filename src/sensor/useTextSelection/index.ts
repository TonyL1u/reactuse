import { useState } from 'react';
import { useEventListener } from '../../browser/useEventListener';
import { useLatest } from '../../state/useLatest';
import { useUpdate } from '../../state/useUpdate';

export interface UseTextSelectionReturn {
    /**
     * Current selected text.
     */
    text: string;
    ranges: Range[];
    rects: DOMRect[];
}

function getRangesFromSelection(selection: Selection) {
    const rangeCount = selection.rangeCount ?? 0;
    const ranges = new Array<Range>(rangeCount);
    for (let i = 0; i < rangeCount; i++) {
        const range = selection.getRangeAt(i);
        ranges[i] = range;
    }
    return ranges;
}

/**
 * Reactively track user text selection based on [`Window.getSelection`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection).
 *
 * @example
 * ```ts
 * import { useTextSelection } from 'reactuse';
 *
 * const { text } = useTextSelection();
 * ```
 */
export function useTextSelection(): UseTextSelectionReturn {
    const update = useUpdate();
    const [selection, setSelection] = useState<Selection | null>(null);
    const text = useLatest(selection?.toString() ?? '');
    const ranges = useLatest(selection ? getRangesFromSelection(selection) : []);
    const rects = useLatest(ranges.current.map(range => range.getBoundingClientRect()));

    useEventListener(document, 'selectionchange', () => {
        const sel = window.getSelection();
        setSelection(sel);
        update();
    });

    return { text: text.current, ranges: ranges.current, rects: rects.current };
}
