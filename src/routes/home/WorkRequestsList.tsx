import { $workRequests, getWorkRequestsListFX } from '@core/requests';
import { useInterval } from '@core/utils/userInterval';
import { CardHeader } from '@mui/material';
import { BaseList } from '@ui/table/BaseTable';
import { useUnit } from 'effector-react';
import { tableWorkRequestsConfig } from './TableConfig';

export const WorkRequestsList = ({ connected }: { connected: boolean }) => {
  const { requests } = useUnit($workRequests);
  const isLoading = useUnit(getWorkRequestsListFX.pending);

  const shouldFetch = !requests.length && connected && !isLoading;
  useInterval(() => getWorkRequestsListFX(), shouldFetch ? 2500 : null);

  if (!connected) {
    return null;
  }

  return <BaseList data={requests} config={tableWorkRequestsConfig} listHeader={<CardHeader title="Новые заявки" />} />;
};
