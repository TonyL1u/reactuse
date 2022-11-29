import { useState, useRef, useMemo } from 'react';
import { useEventListener } from '../../browser/useEventListener';
import { useElementSize } from '../../elements/useElementSize';
import { useWindowSize } from '../../elements/useWindowSize';
import { useOnMounted } from '../../shared/useOnMounted';
import { getTargetElement, noop } from '../../helper';
import type { MaybeElementRef, MaybeElement, Position } from '../../helper';

export interface UseDraggableOptions {
    draggingArea?: MaybeElementRef;
    wrap?: boolean;
    onStart?: (e: PointerEvent) => void | boolean;
    onDragging?: (e: PointerEvent) => void;
    onEnd?: (e: PointerEvent) => void;
}

export interface UseDraggableReturn {
    x: number;
    y: number;
    style: { transform: string };
    isDragging: boolean;
    syncPosition: (x: number, y: number) => void;
}

/**
 * Make elements draggable.
 * 
 * @example
 * Under hook, `useDraggable` uses [`CSS translate`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate) to make elements draggable. You can also choose your own way to position the element. For example:
 *
 * ```ts
 * const el = useRef<HTMLDivElement>(null);
 * const { x, y } = useDraggable(el);
 * ```
 *
 * ```tsx
 * <div ref={el} style={{ position: 'absolute', top: y, left: x }}></div>
 * ```
 *
 * Sometimes you may want to restrict an element that can only be dragged in a specific area. All you need to do is giving it an dragging wrapper area (default is Window).
 *
 * ```tsx
 * import { useRef } from 'react';
 * import { useDraggable } from 'reactuse';
 *
 * export default () => {
 *     const wrapper = useRef<HTMLDivElement>(null);
 *     const el = useRef<HTMLDivElement>(null);
 *     const { style } = useDraggable(el, { wrap: true, draggingArea: wrapper });
 *
 *     return <div ref={wrapper}>
 *         <div ref={el} style={style}></div>
 *     </div>
 * }
 * ```
 * @param target - DOM element or an HTML element wrapped by `useRef()`
 * @param options - 
 * @typeParam T - Type of the real HTML element
 * @returns
 */
export function useDraggable<T extends Exclude<MaybeElement, Window | Document>>(target: MaybeElementRef<T>, options: UseDraggableOptions = {}): UseDraggableReturn {
    const { draggingArea = window, wrap = false, onStart = noop, onDragging = noop, onEnd = noop } = options;

    const startPoint = useRef<Position | null>(null);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [isDragging, setDragging] = useState(false);
    const style = useMemo(() => {
        const { x = 0, y = 0 } = position ?? {};
        return { transform: `translate3d(${x}px, ${y}px, 0px)` };
    }, [position]);
    const { width: eleWidth, height: eleHeight } = useElementSize(target);
    const { width: winWidth, height: winHeight } = useWindowSize();
    const getTransform = () => {
        const targetElement = getTargetElement(target);
        if (!targetElement) return [NaN, NaN];

        const [_, x, y] = getComputedStyle(targetElement as Element).transform.match(/matrix\(1, 0, 0, 1, (.*), (.*)\)/) ?? ['', 0, 0];

        return [+x, +y];
    };
    const updatePosition = (offsetX: number, offsetY: number) => {
        if (wrap) {
            const [vecX, vecY] = getTransform();
            const { x: eleX, y: eleY } = (getTargetElement(target) as Element).getBoundingClientRect();
            const { x: wrapperX = 0, y: wrapperY = 0, width: wrapperWidth, height: wrapperHeight } = draggingArea === window ? { x: 0, y: 0, width: winWidth, height: winHeight } : (getTargetElement(draggingArea) as Element).getBoundingClientRect();
            const [minX, maxX] = [-(eleX - vecX - wrapperX), wrapperWidth - (eleX - vecX - wrapperX) - eleWidth];
            const [minY, maxY] = [-(eleY - vecY - wrapperY), wrapperHeight - (eleY - vecY - wrapperY) - eleHeight];

            setPosition({ x: offsetX < minX ? minX : offsetX > maxX ? maxX : offsetX, y: offsetY < minY ? minY : offsetY > maxY ? maxY : offsetY });
        } else {
            setPosition({ x: offsetX, y: offsetY });
        }
    };

    useEventListener(target, 'pointerdown', e => {
        if (onStart(e) === false) return;

        const { pageX, pageY } = e;
        const [x, y] = getTransform();

        startPoint.current = { x: pageX - x, y: pageY - y };
        setDragging(false);
    });

    useEventListener(draggingArea, 'pointermove', e => {
        if (!startPoint.current) return;

        const { pageX, pageY } = e;
        const { x, y } = startPoint.current;
        const offsetX = pageX - x;
        const offsetY = pageY - y;
        updatePosition(offsetX, offsetY);
        setDragging(true);
        onDragging(e);
    });

    useEventListener(draggingArea, 'pointerup', e => {
        if (!startPoint.current) return;

        startPoint.current = null;
        setDragging(false);
        onEnd(e);
    });

    useOnMounted(() => {
        const [x, y] = getTransform();

        setPosition({ x, y });
    });

    return {
        ...position,
        style,
        isDragging,
        syncPosition: updatePosition
    };
}
