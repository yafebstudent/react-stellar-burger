import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { websocketUrl } from '../utils/apiConstants';
import { TGetAllOrdersDataQuery } from '../utils/types';

export const websocketAPI = createApi({
  reducerPath: 'websocketAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (build) => ({
    getAllOrdersData: build.query<TGetAllOrdersDataQuery, void>({
      queryFn: () => ({ data: null }),
      async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        const ws = new WebSocket(`${websocketUrl}all`);
        try {
          await cacheDataLoaded;
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);

            updateCachedData(() => data);
          };

          ws.addEventListener('message', listener);
        } catch {
          // if cacheEntryRemoved resolved before cacheDataLoaded,
          // cacheDataLoaded throws
        }
        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});

export const { useGetAllOrdersDataQuery } = websocketAPI;
