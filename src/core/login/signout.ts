import { createEffect } from 'effector';
import { AXAPI } from '../data/fetcher';
import { LS, LSKeys } from '../local-store';

export const signout = createEffect(() => {
  delete AXAPI.defaults.headers.common['Authorization'];
  LS.deleteItem(LSKeys.AuthData);
});
