import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Notes from './Notes.client';
import { fetchNote } from '@/lib/api';
import { NoteTag } from '@/types/note';

interface NotePageProps {
  params: Promise<{ slug: string[] }>;
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
