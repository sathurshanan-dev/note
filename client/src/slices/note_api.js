import { api_slice } from './api';
import { NOTES_URL } from '../constants';

export const note_api_slice = api_slice.injectEndpoints({
  endpoints: (builder) => ({
    notes: builder.query({
      query: (params) => ({
        url: NOTES_URL,
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Notes'],
    }),
    note: builder.query({
      query: ({ token, id }) => ({
        url: `${NOTES_URL}/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Note'],
    }),
    createPost: builder.mutation({
      query: ({ token, title, content }) => ({
        url: `${NOTES_URL}/new`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { title, content },
      }),
      invalidatesTags: ['Notes'],
    }),
    editNote: builder.mutation({
      query: ({ token, id, title, content }) => ({
        url: `${NOTES_URL}/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { title, content },
      }),
      invalidatesTags: ['Note'],
    }),
    deleteNote: builder.mutation({
      query: ({ token, id }) => ({
        url: `${NOTES_URL}/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Notes'],
    }),
  }),
});

export const {
  useNotesQuery,
  useNoteQuery,
  useCreatePostMutation,
  useEditNoteMutation,
  useDeleteNoteMutation,
} = note_api_slice;
