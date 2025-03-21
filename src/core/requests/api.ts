import { AXAPI } from '@core/data/fetcher';
import { createEffect } from 'effector';
import { AdminRequestResponse } from './types';

export const initGetRequestsListFX = createEffect(async (requestId: string) => {
  const { data } = await AXAPI.get<AdminRequestResponse>('/admin/api/requests/all', {
    params: {
      offset: 0,
      requestId,
    },
  });

  return data;
});
export const getRequestsListFX = createEffect(async (offset: number) => {
  const { data } = await AXAPI.get<AdminRequestResponse>('/admin/api/requests/all', {
    params: {
      offset,
    },
  });

  return data;
});
