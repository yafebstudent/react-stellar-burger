import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from '../utils/api/constants';

export const ingredientsDataAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getIngredientsData: build.query({
      query: () => 'ingredients',
    }),
    getOrderData: build.mutation({
      query: (payload) => ({
        url: 'orders',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
  }),
});

export const { useGetIngredientsDataQuery, useGetOrderDataMutation } = ingredientsDataAPI;
