import { useCallback, useMemo } from 'react';
import { useClamp } from '../useClamp';
import { useWatchState } from '../../shared/useWatchState';
import type { SetStateAction } from 'react';

export interface UseOffsetPaginationOptions {
    /**
     * Total number of items.
     */
    total?: number;
    /**
     * The number of items to display per page.
     * @default 10
     */
    pageSize?: number;
    /**
     * The current page number.
     *
     * @default 1
     */
    page?: number;
    /**
     * Callback when the `page` change.
     */
    onPageChange?: (returnValue: UseOffsetPaginationReturn) => unknown;
    /**
     * Callback when the `pageSize` change.
     */
    onPageSizeChange?: (returnValue: UseOffsetPaginationReturn) => unknown;
    /**
     * Callback when the `pageCount` change.
     */
    onPageCountChange?: (returnValue: UseOffsetPaginationReturn) => unknown;
}

export interface UseOffsetPaginationReturn {
    currentPage: number;
    currentPageSize: number;
    pageCount: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    setPageSize: (size: SetStateAction<number>) => void;
    setPage: (page: SetStateAction<number>) => void;
    prev: () => void;
    next: () => void;
}

/**
 * Reactive offset pagination.
 *
 * @example
 * ```ts
 * import { useOffsetPagination } from 'reactuse';
 *
 * const { currentPage, currentPageSize, pageCount, isFirstPage, isLastPage, prev, next, setPage, setPageSize } = useOffsetPagination({
 *     total: data.length,
 *     page: 1,
 *     pageSize: 10,
 *     onPageChange({ currentPage, currentPageSize }) {
 *         // your data fetching function
 *     },
 *     onPageSizeChange({ currentPage, currentPageSize }) {
 *         // your data fetching function
 *     }
 * });
 * ```
 * @param options
 * @returns
 */
export function useOffsetPagination(options: UseOffsetPaginationOptions): UseOffsetPaginationReturn {
    const { total = Infinity, pageSize = 10, page = 1, onPageChange, onPageSizeChange, onPageCountChange } = options;
    const [currentPageSize, setCurrentPageSize] = useClamp(pageSize, 1, Infinity);
    const pageCount = useMemo(() => Math.max(1, Math.ceil(total / currentPageSize)), [total, currentPageSize]);
    const [currentPage, setCurrentPage] = useClamp(page, 1, pageCount);
    const isFirstPage = useMemo(() => currentPage === 1, [currentPage]);
    const isLastPage = useMemo(() => currentPage === pageCount, [currentPage, pageCount]);
    const prev = useCallback(() => {
        setCurrentPage(page => page - 1);
    }, []);
    const next = useCallback(() => {
        setCurrentPage(page => page + 1);
    }, []);
    const returnValue = useMemo<UseOffsetPaginationReturn>(
        () => ({
            currentPage,
            currentPageSize,
            pageCount,
            isFirstPage,
            isLastPage,
            prev,
            next,
            setPage: setCurrentPage,
            setPageSize: setCurrentPageSize
        }),
        [currentPage, currentPageSize, pageCount, isFirstPage, isLastPage, prev, next, setCurrentPage, setCurrentPageSize]
    );

    useWatchState(currentPage, () => {
        onPageChange?.(returnValue);
    });
    useWatchState(currentPageSize, () => {
        onPageSizeChange?.(returnValue);
    });
    useWatchState(pageCount, () => {
        onPageCountChange?.(returnValue);
    });

    return returnValue;
}
