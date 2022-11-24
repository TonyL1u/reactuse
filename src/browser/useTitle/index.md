# useTitle

Reactive document title.

## Usage

```ts
import { useTitle } from 'reactuse';

const { title, setTitle } = useTitle();
setTitle('My Title'); // change title
```

When set `observe = true` , will auto track the mutation of changing the HTML title element.

```ts
import { useTitle } from 'reactuse';

const { title } = useTitle({ observe: true });

const titleElement = document.head.querySelector('title');
titleElement.innerText = 'My Title';
console.log(title); // My Title
```

## Type Declarations

```ts
interface UseTitleOptions {
    observe?: boolean;
}
interface UseTitleReturn {
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
}
/**
 * Overload 1: with initial title
 *
 * @param initialTitle
 */
declare function useTitle(initialTitle: string): UseTitleReturn;
/**
 * Overload 2: with options
 *
 * @param options
 */
declare function useTitle(options: UseTitleOptions): UseTitleReturn;
/**
 * Overload 3: with initial title & options
 *
 * @param initialTitle
 * @param options
 */
declare function useTitle(initialTitle?: string, options?: UseTitleOptions): UseTitleReturn;
```
