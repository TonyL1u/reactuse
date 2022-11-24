import { useState, useRef } from 'react';
import { useWatchState } from '../../shared/useWatchState';
import { useMutationObserver } from '../../elements/useMutationObserver';
import type { Dispatch, SetStateAction } from 'react';

export interface UseTitleOptions {
    observe?: boolean;
}

export interface UseTitleReturn {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
}

/**
 * Overload 1: with initial title
 *
 * @param initialTitle
 */
export function useTitle(initialTitle: string): UseTitleReturn;

/**
 * Overload 2: with options
 *
 * @param options
 */
export function useTitle(options: UseTitleOptions): UseTitleReturn;

/**
 * Overload 3: with initial title & options
 *
 * @param initialTitle
 * @param options
 */
export function useTitle(initialTitle?: string, options?: UseTitleOptions): UseTitleReturn;

export function useTitle(...args: any[]) {
    let initialTitle: string = document.title;
    let options: UseTitleOptions = {};

    if (args.length === 1) {
        if (typeof args[0] === 'string') {
            initialTitle = args[0];
        } else {
            options = args[0];
        }
    } else if (args.length === 2) {
        [initialTitle, options] = args;
    }

    const { observe = false } = options;
    const [title, setTitle] = useState(initialTitle);
    const titleElement = useRef(document.head.querySelector('title'));

    useWatchState(
        title,
        val => {
            document.title = val;
        },
        { immediate: true }
    );

    useMutationObserver(
        titleElement,
        () => {
            if (observe && document && document.title !== title) {
                setTitle(document.title);
            }
        },
        { childList: true }
    );

    return { title, setTitle };
}
