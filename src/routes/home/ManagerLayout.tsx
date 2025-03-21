import { $authData } from '@core/login/store';
import { Box, Button, Typography } from '@mui/material';
import { useUnit } from 'effector-react';

import { getActiveUser } from '@core/login/signin';
import { AdminUserStatus } from '@core/login/types';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import CircleIcon from '@mui/icons-material/Circle';
import { useRef, useState } from 'react';

export const ManagerLayout = () => {
  const authData = useUnit($authData)!;
  const ctrlRef = useRef<AbortController | null>(null);
  const [connected, setConnected] = useState(false);

  const connectToSSE = () => {
    if (connected) return;
    const ctrl = new AbortController();
    ctrlRef.current = ctrl;
    fetchEventSource(`${import.meta.env.VITE_SERVER_URL}/admin/api/requests/work`, {
      async onopen(response) {
        if (response.ok && response.headers.get('content-type')?.includes('text/event-stream')) {
          console.log('Connection opened');
          setConnected(true);
          getActiveUser();
        }
      },
      onmessage(ev) {
        console.log('Received:', ev.data);
      },
      onclose() {
        console.log('Connection closed by server');
        setConnected(false);
      },
      onerror(err) {
        console.error('SSE error:', err);
      },
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
      signal: ctrl.signal,
    });
  };

  const disconnectFromSSE = () => {
    if (ctrlRef.current) {
      ctrlRef.current.abort();
    }
    setConnected(false);
    getActiveUser();
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" alignItems="center" gap={2}>
        <Typography>Account:</Typography>
        {authData.user.username}
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <Typography>Ваш статус сейчас:</Typography>
        {authData.user.status === AdminUserStatus.Online && (
          <>
            <CircleIcon color="success" />
            <Typography>Онлайн и принимаете заявки</Typography>
          </>
        )}
        {authData.user.status === AdminUserStatus.Offline && (
          <>
            <CircleIcon color="error" />
            <Typography>Оффлайн и не принимаете заявки</Typography>
          </>
        )}
      </Box>
      <Box>
        {!connected ? (
          <Button variant="contained" onClick={connectToSSE}>
            ✅ Начать работу
          </Button>
        ) : (
          <Button variant="contained" onClick={disconnectFromSSE}>
            🏁 Закончить работу
          </Button>
        )}
      </Box>
    </Box>
  );
};
