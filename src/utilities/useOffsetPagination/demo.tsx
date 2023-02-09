import { useState, useMemo } from 'react';
import { useOffsetPagination } from 'reactuse';
import cn from 'classnames';

const data = [...Array(80)].map((_, index) => ({ id: index, name: `user${index}` }));
const btnCls = 'tw-outline-none tw-border-none tw-rounded tw-px-4 tw-py-2 tw-bg-green-500 tw-cursor-pointer tw-text-sm tw-text-white hover:tw-bg-green-600';
const btnDisabledCls = 'tw-bg-gray-300 tw-pointer-events-none tw-cursor-default';

export default () => {
    const [userData, setUserData] = useState(data.slice(0, 10));
    const fetchData = (currentPage: number, currentPageSize: number) => {
        const start = (currentPage - 1) * currentPageSize;
        const end = start + currentPageSize;
        setUserData(data.slice(start, end));
    };
    const { currentPage, currentPageSize, pageCount, isFirstPage, isLastPage, prev, next, setPage } = useOffsetPagination({
        total: data.length,
        page: 1,
        pageSize: 10,
        onPageChange({ currentPage, currentPageSize }) {
            fetchData(currentPage, currentPageSize);
        }
    });
    const pagination = useMemo(() => {
        return (
            <div className="tw-flex tw-gap-x-2 tw-mt-5">
                <button className={cn(btnCls, isFirstPage && btnDisabledCls)} disabled={isFirstPage} onClick={prev}>
                    prev
                </button>
                {[...Array(pageCount)].map((_, index) => (
                    <button className={cn(btnCls, currentPage === index + 1 && btnDisabledCls)} disabled={currentPage === index + 1} onClick={() => setPage(index + 1)} key={index}>
                        {index + 1}
                    </button>
                ))}
                <button className={cn(btnCls, isLastPage && btnDisabledCls)} disabled={isLastPage} onClick={next}>
                    next
                </button>
            </div>
        );
    }, [pageCount, isFirstPage, isLastPage, currentPage]);
    const table = useMemo(() => {
        return (
            <table className="doc-demo-widget-table">
                <thead>
                    <tr>
                        <td>id</td>
                        <td>name</td>
                    </tr>
                </thead>
                <tbody>
                    {userData.map(({ id, name }) => {
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }, [userData]);

    return (
        <>
            <div className="tw-gap-x-4 tw-gap-y-2 tw-grid-cols-2 tw-inline-grid tw-items-center">
                <div>total:</div>
                <div>{userData.length}</div>
                <div>pageCount:</div>
                <div>{pageCount}</div>
                <div>currentPageSize:</div>
                <div>{currentPageSize}</div>
                <div>currentPage:</div>
                <div>{currentPage}</div>
                <div>isFirstPage:</div>
                <div>{String(isFirstPage)}</div>
                <div>isLastPage:</div>
                <div>{String(isLastPage)}</div>
            </div>
            {pagination}
            {table}
        </>
    );
};
