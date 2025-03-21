import { LS, LSKeys } from '@core/local-store';
import { getActiveUser } from '@core/login/signin';
import { AdminUserRole } from '@core/login/types';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import {
  Alert,
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Toolbar,
} from '@mui/material';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { LoaderFunctionArgs, Outlet, redirect, useFetcher } from 'react-router-dom';
import { $authData } from '../core/login/store';
import { $snacks, closeSnack } from '../core/snacks/store';

const menuItems = [
  {
    path: '/',
    text: 'Главная',
    icon: HomeIcon,
    roles: [AdminUserRole.Admin, AdminUserRole.Manager],
  },
  {
    path: '/users',
    text: 'Пользователи',
    icon: ManageAccountsIcon,
    roles: [AdminUserRole.Admin],
  },
  {
    path: '/config',
    text: 'Конфиг платежей',
    icon: SettingsIcon,
    roles: [AdminUserRole.Admin],
  },
  {
    path: '/accounts?statsInterval=today',
    text: 'Аккаунты',
    icon: SupervisorAccountIcon,
    roles: [AdminUserRole.Admin],
  },
];

export const Component = () => {
  const [open, setOpen] = useState(false);
  const authData = useUnit($authData);
  const snacksStore = useUnit($snacks);
  const fetcher = useFetcher();

  const openMenu = () => {
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={authData ? openMenu : undefined}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            {authData && (
              <fetcher.Form method="post" action="/logout" style={{ marginLeft: 'auto' }}>
                <Button type="submit" variant="contained" color="secondary">
                  Logout
                </Button>
              </fetcher.Form>
            )}
          </Toolbar>
        </AppBar>
        <Drawer open={open} onClose={closeMenu}>
          <Box sx={{ width: 250 }} role="presentation" onClick={closeMenu}>
            <List>
              {authData &&
                menuItems
                  .filter(item => item.roles.includes(authData.user.role))
                  .map(item => (
                    <Link key={item.path} href={item.path} sx={{ textDecoration: 'none', color: 'MenuText' }}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <item.icon />
                          </ListItemIcon>
                          <ListItemText primary={item.text} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
            </List>
          </Box>
        </Drawer>
      </Box>
      <Box sx={{ padding: 2 }}>
        <Outlet />
      </Box>
      <Snackbar open={snacksStore.open} autoHideDuration={6000} onClose={() => closeSnack()} message={snacksStore.message}>
        <Alert onClose={() => closeSnack()} severity={snacksStore.severity} variant="filled" sx={{ width: '100%' }}>
          {snacksStore.message}
        </Alert>
      </Snackbar>
    </>
  );
};

Component.displayName = 'Root';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  if (!LS.getItem(LSKeys.AuthData, null)) {
    const params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    return redirect('/login?' + params.toString());
  }
  await getActiveUser();
  return null;
};
