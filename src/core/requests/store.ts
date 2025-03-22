import { createEvent, createStore, sample } from 'effector';
import { confirmRequestFX, getRequestsListFX, getWorkRequestsListFX, initGetRequestsListFX } from './api';
import { AdminRequestItem, WorkRequestAssignItem } from './types';

const removeRequestEv = createEvent<number>();

export const $requests = createStore<{
  requests: AdminRequestItem[];
  offset: number;
}>({
  requests: [],
  offset: 0,
});
export const $workRequests = createStore<{
  requests: WorkRequestAssignItem[];
}>({
  requests: [],
});

$requests.on(getRequestsListFX.doneData, (state, data) => ({
  requests: state.requests.concat(data.confirmed.concat(data.nonconfirmed)),
  offset: state.offset + 100,
}));

$requests.on(initGetRequestsListFX.doneData, (_, data) => ({
  requests: data.confirmed.concat(data.nonconfirmed),
  offset: 100,
}));

$workRequests.on(getWorkRequestsListFX.doneData, (state, data) => ({
  requests: state.requests.concat(data),
}));
$workRequests.on(removeRequestEv, (state, requestId) => ({
  requests: state.requests.filter(requestItem => requestItem.request.id !== requestId),
}));

sample({
  clock: confirmRequestFX.done.map(({ params }) => params),
  target: removeRequestEv,
});
