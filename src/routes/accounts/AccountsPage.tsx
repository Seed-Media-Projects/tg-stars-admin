import { AccountItem } from '@core/accounts';
import { Box, Button, CardHeader, Grid, Link } from '@mui/material';
import { BaseList } from '@ui/table/BaseTable';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { tableAccountsConfig } from './TableConfig';
import { accountsLoader } from './loader';

const statsIntervalValues = [
  {
    title: 'Сегодня',
    value: 'today',
  },
  {
    title: 'Вчера',
    value: 'yesterday',
  },
  {
    title: 'Неделя',
    value: 'week',
  },
  {
    title: 'Месяц',
    value: 'month',
  },
  {
    title: 'Все время',
    value: 'all',
  },
];

const AccountsPage = () => {
  const { accounts } = useLoaderData() as { accounts: AccountItem[] };
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Grid item xs={12}>
      <BaseList
        data={accounts}
        config={tableAccountsConfig}
        listHeader={
          <Box>
            <CardHeader
              title="Accounts"
              action={
                <Link href="/accounts/create">
                  <Button variant="contained">Add account</Button>
                </Link>
              }
            />
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
                alignItems: 'center',
                marginY: 1,
                marginX: 2,
              }}
            >
              {statsIntervalValues.map(({ title, value }) => (
                <Button
                  key={value}
                  variant={value === searchParams.get('statsInterval') ? 'contained' : 'outlined'}
                  onClick={() => setSearchParams({ statsInterval: value })}
                >
                  {title}
                </Button>
              ))}
            </Box>
          </Box>
        }
      />
    </Grid>
  );
};

export const Component = AccountsPage;
export const loader = accountsLoader;
