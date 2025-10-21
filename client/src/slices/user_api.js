import { api_slice } from './api';
import { USERS_URL } from '../constants';

export const user_api_slice = api_slice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (params) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const { useRegisterMutation } = user_api_slice;
