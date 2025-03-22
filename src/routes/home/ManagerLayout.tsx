import { $authData } from '@core/login/store';
import { Box, Button, Typography } from '@mui/material';
import { useUnit } from 'effector-react';

import { getActiveUser } from '@core/login/signin';
import { AdminUserStatus } from '@core/login/types';
import { getWorkRequestsListFX, startWorkFX, stopWorkFX } from '@core/requests';
import CircleIcon from '@mui/icons-material/Circle';
import { useState } from 'react';
import { WorkRequestsList } from './WorkRequestsList';

export const ManagerLayout = () => {
  const authData = useUnit($authData)!;
  const [connected, setConnected] = useState(authData.user.status === AdminUserStatus.Online);

  const startWork = () => {
    if (connected) return;

    startWorkFX().then(() => {
      getWorkRequestsListFX();
      getActiveUser();
      setConnected(true);
    });
  };

  const stopWork = () => {
    stopWorkFX().then(() => {
      getActiveUser();
      setConnected(false);
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" alignItems="center" gap={2}>
        <Typography>Account:</Typography>
        {authData.user.username}
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <Typography>Ваш статус сейчас:</Typography>
        {connected ? (
          <>
            <CircleIcon color="success" />
            <Typography>Онлайн и принимаете заявки</Typography>
          </>
        ) : (
          <>
            <CircleIcon color="error" />
            <Typography>Оффлайн и не принимаете заявки</Typography>
          </>
        )}
      </Box>
      <Box>
        {!connected ? (
          <Button variant="contained" onClick={startWork}>
            ✅ Начать работу
          </Button>
        ) : (
          <Button variant="contained" onClick={stopWork}>
            🏁 Закончить работу
          </Button>
        )}
      </Box>

      <WorkRequestsList connected={connected} />
    </Box>
  );
};
