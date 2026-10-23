import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Lead, CreateLeadDto } from '../types/lead';

export const leadsApi = createApi({
  reducerPath: 'leadsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['Lead'],
  endpoints: (builder) => ({
    getLeads: builder.query<Lead[], void>({
      query: () => '/leads',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Lead' as const, id })), { type: 'Lead', id: 'LIST' }]
          : [{ type: 'Lead', id: 'LIST' }],
    }),
    createLead: builder.mutation<Lead, CreateLeadDto>({
      query: (body) => ({
        url: '/leads',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Lead', id: 'LIST' }],
    }),
  }),
});

export const { useGetLeadsQuery, useCreateLeadMutation } = leadsApi;
