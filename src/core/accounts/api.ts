import { createEffect } from 'effector';
import { AXAPI } from '../data/fetcher';
import { AccountItem, CreateAccountPayload } from './types';

export const getAllAccountsFX = createEffect(async (statsInterval: string) => {
  const { data } = await AXAPI.get<AccountItem[]>('/admin/api/accounts', {
    params: {
      statsInterval,
    },
  });

  return data;
});

export const createAccountFX = createEffect(async (payload: CreateAccountPayload) => {
  await AXAPI.post(`/admin/api/accounts`, payload);
});

export const deleteAccountFX = createEffect(async (accountId: number) => {
  await AXAPI.delete(`/admin/api/accounts/${accountId}`);
});
