import { useCopyToClipboard } from '@core/hooks/useCopyToClipboard';
import { confirmRequestFX, WorkRequestAssignItem } from '@core/requests';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { ActionModal } from '@ui/modal/ActionModal';
import { actionsConfig, RowOptionsIcons } from '@ui/table/RowOptions';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { ColumnShape } from 'react-base-table';
import { typographyColumnToKey, typographyDateColumn } from '../../ui/table/config-elements';

export const tableWorkRequestsConfig: ColumnShape<WorkRequestAssignItem>[] = [
  {
    title: 'Id',
    ...typographyColumnToKey('request', 'id'),
    width: 60,
  },
  {
    title: 'Дата',
    ...typographyDateColumn({ dataKey: 'assign', formatString: 'HH:mm DD.MM' }),
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
            {rowData.request.requestData.type === 'stars' ? 'Stars' : 'Telegram Premium'}
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
    cellRenderer: ({ rowData }) => <DataItem requestItem={rowData} />,
  },
  {
    key: 'username',
    title: 'Username',
    width: 200,
    sortable: false,
    cellRenderer: ({ rowData }) => <DataUserName requestItem={rowData} />,
  },
  {
    ...actionsConfig(),
    width: 170,
    cellRenderer: ({ rowData }) => <Actions requestItem={rowData} />,
  },
];

const DataUserName = ({ requestItem }: { requestItem: WorkRequestAssignItem }) => {
  const { copiedText, copy } = useCopyToClipboard();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        cursor: 'pointer',
      }}
      onClick={() => copy(`@${requestItem.request.requestData.username}`)}
    >
      <Tooltip title="Copied" open={!!copiedText} placement="top">
        <Typography sx={{ whiteSpace: 'normal' }}>@{requestItem.request.requestData.username}</Typography>
      </Tooltip>
      <ContentCopyIcon />
    </Box>
  );
};
const DataItem = ({ requestItem }: { requestItem: WorkRequestAssignItem }) => {
  const { copiedText, copy } = useCopyToClipboard();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        cursor: 'pointer',
      }}
      onClick={() => copy(`@${requestItem.request.requestData.amount}`)}
    >
      <Tooltip title="Copied" open={!!copiedText} placement="top">
        <Typography sx={{ whiteSpace: 'normal' }}>
          {requestItem.request.requestData.type === 'stars'
            ? `${requestItem.request.requestData.amount} шт`
            : `${requestItem.request.requestData.amount} мес`}
        </Typography>
      </Tooltip>
      <ContentCopyIcon />
    </Box>
  );
};

const Actions = ({ requestItem }: { requestItem: WorkRequestAssignItem }) => {
  const [open, setOpen] = useState(false);
  const loading = useUnit(confirmRequestFX.pending);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const title = `Вы действительно хотите подтвердить заявку под номером ${requestItem.request.id}?`;
  const subtitle = `Заявка на ${requestItem.request.requestData.type === 'stars' ? 'Stars' : 'Telegram Premium'} ${
    requestItem.request.requestData.type === 'stars'
      ? `${requestItem.request.requestData.amount} шт`
      : `${requestItem.request.requestData.amount} мес`
  }`;

  return (
    <RowOptionsIcons
      options={[]}
      deleteBtn={
        <>
          <Button variant="contained" onClick={handleOpen}>
            Подтвердить
          </Button>
          <ActionModal
            loading={loading}
            onClose={handleClose}
            onConfirm={() => {
              confirmRequestFX(requestItem.request.id).then(() => {
                handleClose();
              });
            }}
            open={open}
            title={title}
            subtitle={subtitle}
            confirmText="Подтвердить"
            cancelText="Отмена"
            cancelColor="error"
            confirmColor="success"
          />
        </>
      }
    />
  );
};
