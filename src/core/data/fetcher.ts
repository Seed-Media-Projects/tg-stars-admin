import axios, { AxiosError } from 'axios';
import { LS, LSKeys } from '../local-store';
import { signout } from '../login/signout';

export const AXAPI = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

const authData = LS.getItem(LSKeys.AuthData, null);

if (authData?.token) {
  AXAPI.defaults.headers.common['Authorization'] = `Bearer ${authData.token}`;
}

AXAPI.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    console.debug('errors', error.toJSON());
    if (error.response?.status === 401) {
      signout();
      window.location.replace('/login');
    }

    throw error;
  },
);
