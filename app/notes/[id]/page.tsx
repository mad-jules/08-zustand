import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteDetails from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

type NoteDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: NoteDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);
  if (!note) {
    notFound();
  }
  return {
    title: `NoteHub - Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `NoteHub - Note: ${note.title}`,
      description: note.content.slice(0, 100),
      url: `https://08-zustand-chi-ten.vercel.app/notes/${id}`,
      images: {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'An application for note-taking and organization',
      },
    },
  };
}

export default async function Details({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', id],
    queryFn: () => {
      return fetchNoteById(id);
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails />
    </HydrationBoundary>
  );
}
