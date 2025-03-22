import { AXAPI } from '@core/data/fetcher';
import { createEffect } from 'effector';
import { AdminRequestResponse, WorkRequestAssignItem } from './types';

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

export const getWorkRequestsListFX = createEffect(async () => {
  const { data } = await AXAPI.get<WorkRequestAssignItem[]>('/admin/api/requests');

  return data;
});
export const startWorkFX = createEffect(async () => {
  await AXAPI.post('/admin/api/requests/work/start');
});
export const stopWorkFX = createEffect(async () => {
  await AXAPI.post('/admin/api/requests/work/stop');
});
export const confirmRequestFX = createEffect(async (requestId: number) => {
  await AXAPI.post(`/admin/api/requests/confirm/${requestId}`);
});
