import { createEffect } from 'effector';
import { AXAPI } from '../data/fetcher';
import { UserInfo, UserListItem } from './types';

export const initGetUsersListFX = createEffect(async () => {
  const { data } = await AXAPI.get<UserListItem[]>('/admin/api/user', {
    params: {
      offset: 0,
    },
  });

  return data;
});
export const getUsersListFX = createEffect(async (offset: number) => {
  const { data } = await AXAPI.get<UserListItem[]>('/admin/api/user', {
    params: {
      offset,
    },
  });

  return data;
});

export const getUserDataFX = createEffect(async (tgUserId: number) => {
  const { data } = await AXAPI.get<UserInfo>(`/admin/api/user/${tgUserId}`);

  return data;
});

export const deleteUserFX = createEffect(async (tgUserId: number) => {
  await AXAPI.delete(`/admin/api/user/${tgUserId}`);
});
