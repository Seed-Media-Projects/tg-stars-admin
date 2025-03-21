import { createStore } from 'effector';
import { LS, LSKeys } from '../local-store';
import { getActiveUser, sigin } from './signin';
import { signout } from './signout';

export const $authData = createStore(LS.getItem(LSKeys.AuthData, null));

$authData.on(sigin.doneData, (_, data) => data);
$authData.on(getActiveUser.doneData, (state, data) => {
  if (!state) {
    return state;
  }

  const newState = {
    ...state,
    user: data.user,
  };
  LS.setItem(LSKeys.AuthData, newState);
  return newState;
});
$authData.on(signout.done, () => null);
