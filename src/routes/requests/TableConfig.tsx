import { useCopyToClipboard } from '@core/hooks/useCopyToClipboard';
import { AdminRequestItem, RequestStatus } from '@core/requests';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { ColumnShape } from 'react-base-table';
import { typographyColumn, typographyDateColumn } from '../../ui/table/config-elements';
export const tableRequestsConfig: ColumnShape<AdminRequestItem>[] = [
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

const DataUserName = ({ requestItem }: { requestItem: AdminRequestItem }) => {
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
