import css from './NoteDetails.module.css';

interface NoteDetailsProps {
  title: string;
  content: string;
  date: string;
}

export default function NoteDetails({
  title,
  content,
  date,
}: NoteDetailsProps) {
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{title}</h2>
        </div>
        <p className={css.content}>{content}</p>
        <p className={css.date}>
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
}
