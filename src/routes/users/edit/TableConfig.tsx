import { useCopyToClipboard } from '@core/hooks/useCopyToClipboard';
import { RequestStatus } from '@core/requests';
import { UserRequestItem, UserTransactionItem } from '@core/users';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Tooltip, Typography } from '@mui/material';
import { typographyColumn, typographyDateColumn } from '@ui/table/config-elements';
import dayjs from 'dayjs';
import { ColumnShape } from 'react-base-table';

export const tableUserTransactionsConfig: ColumnShape<UserTransactionItem>[] = [
  {
    title: 'Id',
    ...typographyColumn({ dataKey: 'id' }),
    width: 60,
  },
  {
    title: 'Тип',
    ...typographyColumn({ dataKey: 'type' }),
    width: 120,
  },
  {
    key: 'orderId',
    title: 'OrderId',
    width: 400,
    sortable: false,
    cellRenderer: ({ rowData }) => <DataOrderId transaction={rowData} />,
  },
  {
    key: 'status',
    title: 'Status',
    width: 200,
    sortable: false,
    cellRenderer: ({ rowData }) => {
      return (
        <div>
          <Typography sx={{ whiteSpace: 'normal' }}>{rowData.transactionData.status}</Typography>
        </div>
      );
    },
  },
  {
    key: 'amount',
    title: 'Amount',
    width: 200,
    sortable: false,
    cellRenderer: ({ rowData }) => {
      return (
        <div>
          <Typography sx={{ whiteSpace: 'normal' }}>{rowData.transactionData.amount}</Typography>
        </div>
      );
    },
  },
  {
    key: 'amountPaymentHub',
    title: 'AmountPaymentHub',
    width: 200,
    sortable: false,
    cellRenderer: ({ rowData }) => {
      return (
        <div>
          <Typography sx={{ whiteSpace: 'normal' }}>{rowData.transactionData.amountPaymentHub}</Typography>
        </div>
      );
    },
  },
  {
    key: 'merchant',
    title: 'Merchant',
    width: 200,
    sortable: false,
    cellRenderer: ({ rowData }) => {
      return (
        <div>
          <Typography sx={{ whiteSpace: 'normal' }}>{rowData.transactionData.merchant}</Typography>
        </div>
      );
    },
  },
  {
    key: 'notes',
    title: 'Notes',
    width: 200,
    sortable: false,
    cellRenderer: ({ rowData }) => {
      return (
        <div>
          <Typography sx={{ whiteSpace: 'normal' }}>{rowData.transactionData.notes}</Typography>
        </div>
      );
    },
  },
  {
    key: 'type-data',
    title: 'Type',
    width: 200,
    sortable: false,
    cellRenderer: ({ rowData }) => {
      return (
        <div>
          <Typography sx={{ whiteSpace: 'normal' }}>{rowData.transactionData.type}</Typography>
        </div>
      );
    },
  },
];

export const tableUserRequestsConfig: ColumnShape<UserRequestItem>[] = [
  {
    title: 'Id',
    ...typographyColumn({ dataKey: 'id' }),
    width: 60,
  },
  {
    title: 'Дата',
    ...typographyDateColumn({ dataKey: 'created', formatString: 'HH:mm DD.MM' }),
    width: 120,
  },
  {
    key: 'item',
    title: 'Товар',
    width: 200,
    sortable: false,
    cellRenderer: ({ rowData }) => {
      return (
        <div>
          <Typography sx={{ whiteSpace: 'normal' }}>
            {rowData.requestData.type === 'stars' ? 'Stars' : 'Telegram Premium'}
          </Typography>
        </div>
      );
    },
  },
  {
    key: 'amount',
    title: 'Кол-во / Период',
    width: 200,
    sortable: false,
    cellRenderer: ({ rowData }) => {
      return (
        <div>
          <Typography sx={{ whiteSpace: 'normal' }}>
            {rowData.requestData.type === 'stars' ? `${rowData.requestData.amount} шт` : `${rowData.requestData.amount} мес`}
          </Typography>
        </div>
      );
    },
  },
  {
    key: 'username',
    title: 'Username',
    width: 200,
    sortable: false,
    cellRenderer: ({ rowData }) => <DataUserName requestItem={rowData} />,
  },
  {
    key: 'confirmed',
    title: 'Подтверждено',
    width: 200,
    sortable: false,
    cellRenderer: ({ rowData }) => {
      return (
        <div>
          <Typography sx={{ whiteSpace: 'normal' }}>
            {rowData.requestStatus === RequestStatus.Confirmed ? dayjs(rowData.updated).format('HH:mm DD.MM') : '-'}
          </Typography>
        </div>
      );
    },
  },
];

const DataUserName = ({ requestItem }: { requestItem: UserRequestItem }) => {
  const { copiedText, copy } = useCopyToClipboard();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        cursor: 'pointer',
      }}
      onClick={() => copy(`@${requestItem.requestData.username}`)}
    >
      <Tooltip title="Copied" open={!!copiedText} placement="top">
        <Typography sx={{ whiteSpace: 'normal' }}>@{requestItem.requestData.username}</Typography>
      </Tooltip>
      <ContentCopyIcon />
    </Box>
  );
};
const DataOrderId = ({ transaction }: { transaction: UserTransactionItem }) => {
  const { copiedText, copy } = useCopyToClipboard();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        cursor: 'pointer',
      }}
      onClick={() => copy(transaction.transactionData.orderId)}
    >
      <Tooltip title="Copied" open={!!copiedText} placement="top">
        <Typography sx={{ whiteSpace: 'normal' }}>{transaction.transactionData.orderId}</Typography>
      </Tooltip>
      <ContentCopyIcon />
    </Box>
  );
};
