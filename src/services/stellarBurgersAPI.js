import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from '../utils/api/constants';

export const stellarBurgersAPI = createApi({
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
    getResetEmail: build.mutation({
      query: (payload) => ({
        url: 'password-reset',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    resetPassword: build.mutation({
      query: (payload) => ({
        url: 'password-reset/reset',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    registerUser: build.mutation({
      query: (payload) => ({
        url: 'auth/register',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
  }),
});

export const {
  useGetIngredientsDataQuery,
  useGetOrderDataMutation,
  useGetResetEmailMutation,
  useResetPasswordMutation,
  useRegisterUserMutation,
} = stellarBurgersAPI;
