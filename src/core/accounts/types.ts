import { AdminUserRole, AdminUserStatus } from '@core/login/types';

export type CreateAccountPayload = {
  username: string;
  password: string;
};

export type AccountItem = {
  id: number;
  username: string;
  role: AdminUserRole;
  status: AdminUserStatus;
  created: string;
  stats: AccountItemStats[];
};

export type AccountItemStats = {
  adminUserId: number;
  requestsCount: string;
  sumAmount: string;
  requestType: 'premium' | 'stars';
  requestDuration: '1m' | '3m' | '6m' | '12m' | 'Unknown';
};
