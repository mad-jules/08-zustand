import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Notes from './Notes.client';
import { fetchNote } from '@/lib/api';
import { NoteTag } from '@/types/note';
import { Metadata } from 'next';

interface NotePageProps {
  params: Promise<{ slug: string[] }>;
}

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tagId = slug?.[0] || 'All';
  const filterName =
    tagId === 'All' ? 'All notes' : `Notes with tag "${tagId}"`;

  return {
    title: `${filterName} | NoteHub`,
    description: `Notes with tag "${tagId}" in NoteHub.`,
    openGraph: {
      title: `${filterName} | NoteHub`,
      description: `Notes with tag "${tagId}" in NoteHub.`,
      url: `https://notehub.vercel.app/notes/filter/${tagId}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub - ${filterName}`,
        },
      ],
    },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const tag: NoteTag | undefined =
    slug[0] === 'All' ? undefined : (slug[0] as NoteTag);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag],
    queryFn: () => {
      return fetchNote({ page: 1, tag });
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={tag} />
    </HydrationBoundary>
  );
}
