import { UserRequestItem } from '@core/users';
import { CardHeader } from '@mui/material';
import { BaseList } from '@ui/table/BaseTable';
import { tableUserRequestsConfig } from './TableConfig';

export const UserRequests = ({ requests }: { requests: UserRequestItem[] }) => {
  return <BaseList data={requests} config={tableUserRequestsConfig} listHeader={<CardHeader title="Заявки" />} />;
};
