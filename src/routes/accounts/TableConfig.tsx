import { AccountItem, deleteAccountFX } from '@core/accounts';
import { AdminUserStatus } from '@core/login/types';
import CircleIcon from '@mui/icons-material/Circle';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { ActionModal } from '@ui/modal/ActionModal';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { ColumnShape } from 'react-base-table';
import { useNavigate } from 'react-router-dom';
import { actionsConfig, RowOptionsIcons } from '../../ui/table/RowOptions';
import { typographyColumn } from '../../ui/table/config-elements';

export const tableAccountsConfig: ColumnShape<AccountItem>[] = [
  {
    title: 'Логин',
    ...typographyColumn({ dataKey: 'username' }),
  },
  {
    key: 'status',
    title: 'Статус',
    width: 80,
    sortable: false,
    cellRenderer: ({ rowData }) => {
      return (
        <div>
          <CircleIcon color={rowData.status === AdminUserStatus.Online ? 'success' : 'error'} />
        </div>
      );
    },
  },
  {
    key: 'stats-all',
    title: 'Обработано товаров',
    width: 120,
    sortable: false,
    cellRenderer: ({ rowData }) => {
      return <div>{rowData.stats.reduce((acc, item) => acc + item.requestsCount, 0)}</div>;
    },
  },
  {
    key: 'stats-stars',
    title: 'Stars',
    width: 120,
    sortable: false,
    cellRenderer: ({ rowData }) => {
      return (
        <div>{rowData.stats.filter(s => s.requestType === 'stars').reduce((acc, item) => acc + item.sumAmount, 0)}</div>
      );
    },
  },
  {
    key: 'stats-premium',
    title: 'Telegram premium 1/3/6/12',
    width: 200,
    sortable: false,
    cellRenderer: ({ rowData }) => {
      const premium = rowData.stats.filter(s => s.requestType === 'premium');
      const sumData = premium.reduce(
        (acc, item) => {
          switch (item.requestDuration) {
            case '12m':
              acc.twelve += item.sumAmount;
              break;
            case '6m':
              acc.six += item.sumAmount;
              break;
            case '3m':
              acc.three += item.sumAmount;
              break;
            case '1m':
              acc.one += item.sumAmount;
              break;

            default:
              break;
          }

          return acc;
        },
        { three: 0, six: 0, twelve: 0, one: 0 },
      );
      return <div>{`${sumData.one}/${sumData.three}/${sumData.six}/${sumData.twelve}`}</div>;
    },
  },
  {
    ...actionsConfig(),
    cellRenderer: ({ rowData }) => <Actions account={rowData} />,
  },
];

const Actions = ({ account }: { account: AccountItem }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const loading = useUnit(deleteAccountFX.pending);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <RowOptionsIcons
      options={[]}
      deleteBtn={
        <>
          <IconButton onClick={handleOpen}>
            <DeleteIcon />
          </IconButton>
          <ActionModal
            loading={loading}
            onClose={handleClose}
            onConfirm={() => {
              deleteAccountFX(account.id).then(() => {
                handleClose();
                navigate('.', { replace: true });
              });
            }}
            open={open}
            title={`Delete account: ${account.username}`}
            subtitle="Are you sure?"
          />
        </>
      }
    />
  );
};
