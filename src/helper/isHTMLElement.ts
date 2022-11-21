import { MaybeElement } from './types';

export function isHTMLElement(obj: MaybeElement) {
    if (obj === window || obj === document) return true;
    const wrap = document.createElement('div');
    try {
        wrap.appendChild((obj as Element | SVGAElement).cloneNode(true));
        return (obj as Element | SVGAElement).nodeType === 1;
    } catch (error) {
        console.error(error);
        return false;
    }
}
