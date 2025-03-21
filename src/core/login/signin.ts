import { createEffect } from 'effector';
import { AXAPI } from '../data/fetcher';
import { LS, LSKeys } from '../local-store';
import { AuthResponse } from './types';

export const sigin = createEffect(async (payload: { username: string; password: string }) => {
  const { data } = await AXAPI.post<AuthResponse>('/admin/api/auth/login', payload);
  AXAPI.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  LS.setItem(LSKeys.AuthData, data);

  return data;
});
export const getActiveUser = createEffect(async () => {
  const { data } = await AXAPI.get<Omit<AuthResponse, 'token'>>('/admin/api/auth/user');

  return data;
});
