import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { ActionModal } from '@ui/modal/ActionModal';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { ColumnShape } from 'react-base-table';
import { useNavigate } from 'react-router-dom';
import { deleteUserFX, UserListItem, userRoutes } from '../../core/users';
import { actionsConfig, RowOptionsIcons } from '../../ui/table/RowOptions';
import { avatarNameLinkColumn } from '../../ui/table/config-elements';

export const tableUsersConfig: ColumnShape<UserListItem>[] = [
  {
    title: 'Name',
    ...avatarNameLinkColumn({ link: ({ tgUserId }) => userRoutes.detail(tgUserId) }),
  },
  {
    ...actionsConfig(),
    cellRenderer: ({ rowData }) => <Actions account={rowData} />,
  },
];

const Actions = ({ account }: { account: UserListItem }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const loading = useUnit(deleteUserFX.pending);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <RowOptionsIcons
      options={[
        {
          icon: EditIcon,
          name: 'Detail',
          link: userRoutes.detail(account.tgUserId),
        },
      ]}
      deleteBtn={
        <>
          <IconButton onClick={handleOpen}>
            <DeleteIcon />
          </IconButton>
          <ActionModal
            loading={loading}
            onClose={handleClose}
            onConfirm={() => {
              deleteUserFX(account.id).then(() => {
                handleClose();
                navigate('.', { replace: true });
              });
            }}
            open={open}
            title={`Delete user: ${account.firstName} ${account.lastName}`}
            subtitle="Are you sure?"
          />
        </>
      }
    />
  );
};
