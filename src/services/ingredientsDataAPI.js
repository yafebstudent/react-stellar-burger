import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from '../utils/api/constants';

export const ingredientsDataAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getIngredientsData: build.query({
      query: () => 'ingredients',
    }),
  }),
});

export const { useGetIngredientsDataQuery } = ingredientsDataAPI;
