import { $requests, getRequestsListFX } from '@core/requests';
import { CardHeader, Grid } from '@mui/material';
import { BaseList } from '@ui/table/BaseTable';
import { SearchTitle } from '@ui/table/SearchTitle';
import { useUnit } from 'effector-react';
import { tableRequestsConfig } from './TableConfig';
import { adminRequestsLoader } from './loader';

const RequestsPage = () => {
  const { offset, requests } = useUnit($requests);

  return (
    <Grid item xs={12}>
      <BaseList
        data={requests}
        config={tableRequestsConfig}
        listHeader={<CardHeader title="Requests" action={<SearchTitle title="Request Id" searchName="requestId" />} />}
        loadMore={() => {
          if (requests.length >= offset) {
            getRequestsListFX(offset);
          }
        }}
      />
    </Grid>
  );
};

export const loader = adminRequestsLoader;
export const Component = RequestsPage;
