import { createEffect } from 'effector';
import { AXAPI } from '../data/fetcher';
import { ConfigData, SaveConfigPayload } from './types';

export const getConfigDataFX = createEffect(async () => {
  try {
    const { data } = await AXAPI.get<ConfigData | null>('/admin/api/payment-settings');

    return data;
  } catch (error) {
    return null;
  }
});

export const updateConfigFX = createEffect(async (payload: SaveConfigPayload) => {
  await AXAPI.put('/admin/api/payment-settings', payload);
});
