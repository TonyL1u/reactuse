# useEventListener

Use EventListener with ease. Register using [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) on mounted, and [`removeEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) automatically on unmounted.

## Usage

The default registered target is `Window` .

```ts
import { useEventListener } from 'reactuse';

useEventListener('resize', evt => console.log(evt));
```

Or you can pass a specific target (_a pure DOM element or a ref object_). Further more, you can call the returned manually to unregister the listener.

```ts
import { useRef } from 'react';
import { useEventListener } from 'reactuse';

const target = useRef<HTMLDivElement>(null);
const stop = useEventListener(target, 'mousemove', evt => console.log(evt));

stop(); // This will cancel the listener
```

## Type Declarations

```ts
declare type WindowEventName = keyof WindowEventMap;
declare type DocumentEventName = keyof DocumentEventMap;
declare type GeneralEventName = keyof GlobalEventHandlersEventMap;
declare type WindowEventListener<E extends WindowEventName> = (ev: WindowEventMap[E]) => any;
declare type DocumentEventListener<E extends DocumentEventName> = (ev: DocumentEventMap[E]) => any;
declare type GeneralEventListener<E extends GeneralEventName> = (ev: GlobalEventHandlersEventMap[E]) => any;
/**
 * Overload 1: Omitted Window target
 *
 * @param event
 * @param listener
 */
declare function useEventListener<E extends WindowEventName>(event: E, listener: WindowEventListener<E>, options?: boolean | AddEventListenerOptions): Fn;
/**
 * Overload 2: Explicitly Document target
 *
 * @param target
 * @param event
 * @param listener
 */
declare function useEventListener<E extends DocumentEventName>(target: Document, event: E, listener: DocumentEventListener<E>, options?: boolean | AddEventListenerOptions): Fn;
/**
 * Overload 3: Custom target
 *
 * @param target
 * @param event
 * @param listener
 */
declare function useEventListener<E extends GeneralEventName, T extends MaybeElement>(target: MaybeElementRef<T>, event: E, listener: GeneralEventListener<E>, options?: boolean | AddEventListenerOptions): Fn;
```
