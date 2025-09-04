'use client';

import { useState } from 'react';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import css from './page.module.css';
import { Toaster } from 'react-hot-toast';
import { fetchNote } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';
import { Loader } from '@/components/Loader/Loader';
import { NoteTag } from '@/types/note';
import Error from './error';
import Link from 'next/link';

interface NotesProps {
  tag: NoteTag | undefined;
}

export default function Notes({ tag }: NotesProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isFetching, isSuccess, isError, error } = useQuery({
    queryKey: ['notes', search, page, tag],
    queryFn: () => {
      return fetchNote({ page, search, tag });
    },
    placeholderData: keepPreviousData,
  });

  const debounced = useDebouncedCallback((value) => {
    setSearch(value);
    setPage(1);
  }, 1000);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox debounced={debounced} />

        {data && data.totalPages > 1 && (
          <Pagination
            onPageChange={setPage}
            page={page}
            totalPages={data.totalPages}
          />
        )}

        <Link href="/notes/action/create" className={css.link}>
          Create note +
        </Link>
      </header>
      <main>
        {isFetching && <Loader />}
        {isError && <Error error={error} />}
        {data && data.notes.length === 0 && isSuccess && (
          <div>Notes not found</div>
        )}
        {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      </main>
      <Toaster />
    </div>
  );
}
