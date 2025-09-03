import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteDetails from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api';

type Props = {
  params: Promise<{ id: string }>;
};

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
