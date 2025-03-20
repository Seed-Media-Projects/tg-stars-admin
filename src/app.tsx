import { signout } from '@core/login/signout';
import { ErrorBoundary } from '@ui/error-bound';
import 'react-base-table/styles.css';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import { ErrorPage } from './error-page';

const router = createBrowserRouter([
  {
    path: '/',
    lazy: () => import('@routes/root'),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        lazy: () => import('@routes/home'),
      },
      {
        path: 'users',
        lazy: () => import('@routes/users'),
      },
      {
        path: 'users/:userId',
        lazy: () => import('@routes/users/edit/UserPage'),
      },
      {
        path: 'config',
        lazy: () => import('@routes/config'),
      },
      {
        path: 'config/edit',
        lazy: () => import('@routes/config/edit'),
      },
    ],
  },
  {
    path: '/login',
    lazy: () => import('@routes/login'),
  },
  {
    path: '/logout',
    async action() {
      signout();
      return redirect('/login');
    },
  },
]);

export const App = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};
