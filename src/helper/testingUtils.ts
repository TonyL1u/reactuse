interface MouseEventWithOffsets extends MouseEventInit {
    pageX?: number;
    pageY?: number;
    offsetX?: number;
    offsetY?: number;
    x?: number;
    y?: number;
}

export class FakeMouseEvent extends MouseEvent {
    constructor(type: string, values: MouseEventWithOffsets) {
        const { pageX = 0, pageY = 0, offsetX = 0, offsetY = 0, x = 0, y = 0, ...mouseValues } = values;
        super(type, mouseValues);

        Object.assign(this, { offsetX, offsetY, pageX, pageY, x, y });
    }
}

export function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
