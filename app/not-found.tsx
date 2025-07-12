import css from './not-found.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page not found | NoteHub',
  description: 'Oops! It seems the page you are looking for does not exist.',
  openGraph: {
    title: '404 - Page not found | NoteHub',
    description: 'Oops! It seems the page you are looking for does not exist.',
    url: 'https://08-zustand-three-ecru.vercel.app/404',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

const NotFound = () => {
  return (
    <div className={css.center}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
