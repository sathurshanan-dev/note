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
  }),
});

export const { useNotesQuery } = note_api_slice;
