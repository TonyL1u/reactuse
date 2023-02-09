# useOffsetPagination

Reactive offset pagination.

## Usage

```ts
import { useOffsetPagination } from 'reactuse';

const { currentPage, currentPageSize, pageCount, isFirstPage, isLastPage, prev, next, setPage, setPageSize } = useOffsetPagination({
    total: data.length,
    page: 1,
    pageSize: 10,
    onPageChange({ currentPage, currentPageSize }) {
        // your data fetching function
    },
    onPageSizeChange({ currentPage, currentPageSize }) {
        // your data fetching function
    }
});
```

## Type Declarations

```ts
interface UseOffsetPaginationOptions {
    /**
     * Callback when the `page` change.
     */
    onPageChange?: (returnValue: UseOffsetPaginationReturn) => unknown;
    /**
     * Callback when the `pageCount` change.
     */
    onPageCountChange?: (returnValue: UseOffsetPaginationReturn) => unknown;
    /**
     * Callback when the `pageSize` change.
     */
    onPageSizeChange?: (returnValue: UseOffsetPaginationReturn) => unknown;
    /**
     * The current page number.
     *
     * @default 1
     */
    page?: number;
    /**
     * The number of items to display per page.  @default 10
     */
    pageSize?: number;
    /**
     * Total number of items.
     */
    total?: number;
}
interface UseOffsetPaginationReturn {
    currentPage: number;
    currentPageSize: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    next: () => void;
    pageCount: number;
    prev: () => void;
    setPage: (page: SetStateAction<number>) => void;
    setPageSize: (size: SetStateAction<number>) => void;
}
declare function useOffsetPagination(options: UseOffsetPaginationOptions): UseOffsetPaginationReturn;
```

## Params

|  Name   |             Type             | Description | Optional |
| :-----: | :--------------------------: | :---------: | :------: |
| options | `UseOffsetPaginationOptions` |      -      |  false   |
