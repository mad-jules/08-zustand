import css from './LayOutNotes.module.css';

interface TaskLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function TaskLayout({ children, sidebar }: TaskLayoutProps) {
  return (
    <section className={css.section}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
}
