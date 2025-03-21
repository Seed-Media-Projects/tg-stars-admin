import { createStore } from 'effector';
import { getRequestsListFX, initGetRequestsListFX } from './api';
import { AdminRequestItem } from './types';

export const $requests = createStore<{
  requests: AdminRequestItem[];
  offset: number;
}>({
  requests: [],
  offset: 0,
});

$requests.on(getRequestsListFX.doneData, (state, data) => ({
  requests: state.requests.concat(data.confirmed.concat(data.nonconfirmed)),
  offset: state.offset + 100,
}));

$requests.on(initGetRequestsListFX.doneData, (_, data) => ({
  requests: data.confirmed.concat(data.nonconfirmed),
  offset: 100,
}));
