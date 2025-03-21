import { $authData } from '@core/login/store';
import { AdminUserRole } from '@core/login/types';
import { useUnit } from 'effector-react';
import { AdminHomeLayout } from './AdminLayout';
import { homeLoader } from './loader';
import { ManagerLayout } from './ManagerLayout';

const HomePage = () => {
  const authData = useUnit($authData);

  if (!authData) {
    return null;
  }

  if (authData?.user.role === AdminUserRole.Admin) {
    return <AdminHomeLayout />;
  }

  return <ManagerLayout />;
};

export const Component = HomePage;
export const loader = homeLoader;
