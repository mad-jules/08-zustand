import axios from 'axios';
import type { Note, NoteTag } from '@/types/note';

const NotesInstance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}` },
});

interface fetchNoteProps {
  search?: string;
  tag?: NoteTag;
  page: number;
  perPage?: number;
  sortBy?: string;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

// interface UpdateNotePayload {
//     title?: string;
//     content?: string;
//     tag?: NoteTag;
// }

interface ApiGetNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNote({
  search,
  page,
  tag,
}: fetchNoteProps): Promise<ApiGetNotesResponse> {
  const response = await NotesInstance.get<ApiGetNotesResponse>('/notes', {
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
  });
  return response.data;
}

export async function createNote({
  title,
  content,
  tag,
}: CreateNotePayload): Promise<Note> {
  const response = await NotesInstance.post<Note>('/notes', {
    title,
    content,
    tag,
  });
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await NotesInstance.delete<Note>(`/notes/${id}`);
  return response.data;
}

// export async function patchNote(
//     id: string,
//     payload: UpdateNotePayload,
// ): Promise<Note> {
//     const response = await NotesInstance.patch<Note>(`/notes/${id}`, payload);
//     return response.data;
// }

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await NotesInstance.get<Note>(`/notes/${id}`);
  return response.data;
}
