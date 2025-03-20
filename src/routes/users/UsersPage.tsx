import { $users, getUsersListFX, initGetUsersListFX } from '@core/users';
import { CardHeader, Grid } from '@mui/material';
import { BaseList } from '@ui/table/BaseTable';
import { useUnit } from 'effector-react';
import { tableUsersConfig } from './TableConfig';

export const Component = () => {
  const { offset, users } = useUnit($users);

  return (
    <Grid item xs={12}>
      <BaseList
        data={users}
        config={tableUsersConfig}
        listHeader={<CardHeader title="Users" />}
        loadMore={() => {
          if (users.length >= offset) {
            getUsersListFX(offset);
          }
        }}
      />
    </Grid>
  );
};

Component.displayName = 'UsersPage';

export const loader = async () => {
  const users = await initGetUsersListFX();
  return { users };
};
