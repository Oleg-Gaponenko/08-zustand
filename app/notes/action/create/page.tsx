import NoteForm from '@/components/NoteForm/NoteForm';
import css from '../../../page.module.css';

export const metadata = {
  title: 'Create Note with NoteHub',
  description:
    'Create a new note in no time by adding a title, content, and a tag',
  openGraph: {
    title: 'Create Note with NoteHub',
    description:
      'Create a new note in no time by adding a title, content, and a tag',
    url: 'https://08-zustand-three-ecru.vercel.app/',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
