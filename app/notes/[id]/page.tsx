import { fetchNoteById } from '@/lib/api';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const noteId = Number(params.id);

  try {
    const note = await fetchNoteById(noteId);

    return {
      title: `${note.title} | NoteHub`,
      description: note.content?.slice(0, 150) || 'Note details from NoteHub',
      openGraph: {
        title: `${note.title} | NoteHub`,
        description: note.content?.slice(0, 150) || 'Note details from NoteHub',
        url: `https://08-zustand-three-ecru.vercel.app/notes/${noteId}`,
        images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
      },
    };
  } catch (error) {
    return {
      title: 'Note not found | NoteHub',
      description: 'This note does not exist or has been deleted.',
    };
  }
}
