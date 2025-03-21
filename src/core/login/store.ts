import { createStore } from 'effector';
import { LS, LSKeys } from '../local-store';
import { sigin } from './signin';
import { signout } from './signout';

export const $authData = createStore(LS.getItem(LSKeys.AuthData, null));

$authData.on(sigin.doneData, (_, data) => data);
$authData.on(signout.done, () => null);
