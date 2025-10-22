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
    editNote: builder.mutation({
      query: ({ token, id, title, content }) => ({
        url: `${NOTES_URL}/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { title, content },
      }),
      invalidatesTags: ['Notes'],
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

export const { useNotesQuery, useEditNoteMutation, useDeleteNoteMutation } =
  note_api_slice;
