import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] };
}): Promise<Metadata> {
  const tag = params.slug?.[0];
  const initialTag = tag
    ? tag?.charAt(0).toUpperCase() + tag?.slice(1).toLowerCase()
    : '';

  const metaTitle = tag
    ? `Notes tagged with "${initialTag}" | NoteHub`
    : 'All Notes | NoteHub';

  const metaDescription = tag
    ? `Look through notes tagged as "${initialTag}" on NoteHub.`
    : 'Look through all notes on NoteHub.';

  const metaUrl = tag
    ? `https://08-zustand-three-ecru.vercel.app/notes/filter/${tag}`
    : 'https://08-zustand-three-ecru.vercel.app/notes/filter/all';

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: metaUrl,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}
