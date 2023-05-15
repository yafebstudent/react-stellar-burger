import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from '../utils/apiConstants';
import { setUser } from './userSlice';

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
    getUserData: build.query({
      query: (accessToken) => ({
        url: 'auth/user',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setUser(data));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      },
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
    authUser: build.mutation({
      query: (payload) => ({
        url: 'auth/login',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    logOut: build.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        body: {
          token: localStorage.getItem('refreshToken') || '',
        },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    updateUserData: build.mutation({
      query: (payload) => ({
        url: 'auth/user',
        method: 'PATCH',
        body: payload,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
        },
      }),
    }),
  }),
});

export const {
  useGetIngredientsDataQuery,
  useGetUserDataQuery,
  useGetOrderDataMutation,
  useGetResetEmailMutation,
  useResetPasswordMutation,
  useRegisterUserMutation,
  useAuthUserMutation,
  useLogOutMutation,
  useUpdateUserDataMutation,
} = stellarBurgersAPI;
