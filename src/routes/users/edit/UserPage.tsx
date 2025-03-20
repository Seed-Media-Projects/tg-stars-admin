import { UserInfo, deleteUserFX, getUserDataFX } from '@core/users';
import { getDiceBearAvatar } from '@core/utils/dicebear';
import { getInitials } from '@core/utils/get-initials';
import { Avatar, Box, Button, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { ActionModal } from '@ui/modal/ActionModal';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { LoaderFunctionArgs, useLoaderData, useNavigate } from 'react-router-dom';

export const Component = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user } = useLoaderData() as { user: UserInfo | null };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const loading = useUnit(deleteUserFX.pending);

  if (!user) {
    return <Typography>User not found</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        User info
      </Typography>
      <Box my={2} display="flex" gap={2}>
        <Button onClick={handleOpen} variant="contained" color="error">
          Delete
        </Button>
      </Box>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Avatar
          sx={{ width: 30, height: 30, fontSize: '.875rem' }}
          src={
            !user.photoUrl
              ? getDiceBearAvatar(`${user.firstName}-${user.lastName}`)
              : !user.photoUrl.includes('https://')
                ? `${import.meta.env.VITE_SERVER_URL}${user.photoUrl}`
                : user.photoUrl
          }
        >
          {user.photoUrl ? null : getInitials(`${user.firstName} ${user.lastName}`)}
        </Avatar>
        <Typography textTransform="capitalize">
          {user.firstName} {user.lastName}
        </Typography>
      </Box>
      <Typography gutterBottom>Language: {user.language}</Typography>
      <Divider sx={{ my: 2 }} />
      {/* <Typography variant="h6" gutterBottom>
        User crash games
      </Typography>
      {user.userGames ? (
        <>
          <Typography gutterBottom>Total games: {user.userGames.length}</Typography>
          <Typography gutterBottom>Winning games: {user.userGames.filter(g => g.winner).length}</Typography>
          <Typography gutterBottom>
            Last 5 bet+ratio:{' '}
            {user.userGames
              .slice(0)
              .slice(-5)
              .map(g => `bet -> ${g.bet} and ratio -> ${g.ratio}`)
              .join(', ')}
          </Typography>
        </>
      ) : null} */}
      <ActionModal
        loading={loading}
        onClose={handleClose}
        onConfirm={() => {
          deleteUserFX(user.id).then(() => {
            handleClose();
            navigate('.', { replace: true });
          });
        }}
        open={open}
        title={`Delete user: ${user.firstName} ${user.lastName}`}
        subtitle="Are you sure?"
      />
    </Box>
  );
};

Component.displayName = 'UserPage';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.userId) {
    return { user: null };
  }

  const user = await getUserDataFX(Number(params.userId));
  return { user };
};
