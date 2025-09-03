import css from './Pagination.module.css';

import ReactPaginate from 'react-paginate';

interface PaginationProps {
    onPageChange: (n: number) => void;
    page: number;
    totalPages: number;
}

export default function Pagination({
    onPageChange,
    page,
    totalPages,
}: PaginationProps) {
    return (
        <ReactPaginate
            pageRangeDisplayed={4}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => {
                onPageChange(selected + 1);
            }}
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
            pageCount={totalPages}
        />
    );
}
