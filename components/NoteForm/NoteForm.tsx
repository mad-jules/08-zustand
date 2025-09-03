import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from './NoteForm.module.css';
import * as Yup from 'yup';
import type { NoteTag } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote, type CreateNotePayload } from '@/lib/api';
import toast from 'react-hot-toast';

interface NoteFormProps {
  onCancel: () => void;
  defaultTag?: NoteTag;
}

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const tagValue: NoteTag[] = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name is too long')
    .required('Name is required'),
  content: Yup.string().max(500, 'Name is too long'),
  tag: Yup.string().required('Name is required').oneOf(tagValue),
});

export default function NoteForm({ onCancel, defaultTag }: NoteFormProps) {
  const initialValues: NoteFormValues = {
    title: '',
    content: '',
    tag: defaultTag ?? 'Todo',
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['notes'],
    mutationFn: (newNote: CreateNotePayload) => createNote(newNote),
    onSuccess: (note) => {
      onCancel();
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success(`The note ${note.title} has been created.`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        console.log('values', values);
        mutation.mutate(values, {
          onSuccess: () => resetForm(),
        });
      }}
      validationSchema={NoteFormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onCancel} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
