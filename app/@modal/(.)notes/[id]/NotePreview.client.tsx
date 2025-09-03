'use client';

import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import css from './NotePreview.module.css';

export default function NotePreview() {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={handleClose}>
      {isLoading && <p className={css.text}>Loading...</p>}
      {isError && <p>Something went wrong... {error.message}</p>}
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.date}>
              {new Date(note.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <button className={css.backBtn} onClick={handleClose}>
            Back
          </button>
        </div>
      )}
    </Modal>
  );
}
