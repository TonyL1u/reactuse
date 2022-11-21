interface MouseEventWithOffsets extends MouseEventInit {
    pageX?: number;
    pageY?: number;
    offsetX?: number;
    offsetY?: number;
    x?: number;
    y?: number;
}

interface FakeDomRect {
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
    x: number;
    y: number;
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

export function mockResizeObserver(injection?: (cb: any) => void) {
    Object.defineProperty(global, 'ResizeObserver', {
        writable: true,
        value: vi.fn().mockImplementation(cb => {
            injection?.(cb);
            return {
                observe: vi.fn(),
                unobserve: vi.fn(),
                disconnect: vi.fn()
            };
        })
    });
}

export function mockBoundingClientRect() {
    const getBoundingClientRectSpy = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect');

    return {
        reset: getBoundingClientRectSpy.mockReset,
        restore: getBoundingClientRectSpy.mockRestore,
        returnValue: ({ width = 0, height = 0, top = 0, right = 0, bottom = 0, left = 0, x = 0, y = 0 }: Partial<FakeDomRect> = {}) => {
            getBoundingClientRectSpy.mockReturnValue({ width, height, top, right, bottom, left, x, y } as DOMRect);
        }
    };
}
