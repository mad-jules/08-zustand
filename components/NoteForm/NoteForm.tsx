'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';
import type { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

const tagValue: NoteTag[] = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
      await queryClient.refetchQueries({ queryKey: ['notes'] });
      clearDraft();
      router.back();
    },
    onError: (error) => {
      console.error('Create note failed:', error);
    },
  });

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!draft.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (draft.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (draft.title.length > 50) {
      newErrors.title = 'Title must be less than 50 characters';
    }

    if (draft.content.length > 500) {
      newErrors.content = 'Content must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      mutate(draft);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleInputChange = (field: keyof typeof draft, value: string) => {
    setDraft({ [field]: value });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={draft.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className={css.input}
        />
        {errors.title && <span className={css.error}>{errors.title}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={draft.content}
          onChange={(e) => handleInputChange('content', e.target.value)}
          rows={8}
          className={css.textarea}
        />
        {errors.content && <span className={css.error}>{errors.content}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          value={draft.tag}
          onChange={(e) => handleInputChange('tag', e.target.value)}
          className={css.select}
        >
          {tagValue.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          Create note
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className={css.cancelButton}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
