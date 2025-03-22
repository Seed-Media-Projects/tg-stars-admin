import { UserTransactionItem } from '@core/users';
import { CardHeader } from '@mui/material';
import { BaseList } from '@ui/table/BaseTable';
import { tableUserTransactionsConfig } from './TableConfig';

export const UserTransactions = ({ transactions }: { transactions: UserTransactionItem[] }) => {
  return (
    <BaseList data={transactions} config={tableUserTransactionsConfig} listHeader={<CardHeader title="Транзакции" />} />
  );
};
