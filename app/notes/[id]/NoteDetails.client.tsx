'use client';

import NoteDetails from '@/components/NoteDetails/NoteDetails';
import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import css from './NoteDetails.module.css';

export default function NoteDetailsClient() {
  const router = useRouter();

  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p className={css.text}>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <>
      <button
        className={css.backbtn}
        type="button"
        onClick={() => {
          router.back();
        }}
      >
        Back
      </button>
      <NoteDetails
        content={note.content}
        date={note.createdAt}
        title={note.title}
      />
    </>
  );
}
