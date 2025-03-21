export type AuthResponse = {
  token: string;
  user: {
    username: string;
    role: AdminUserRole;
    id: string;
    status: AdminUserStatus;
  };
};

export enum AdminUserRole {
  Admin = 'admin',
  Manager = 'manager',
}

export enum AdminUserStatus {
  Online = 'online',
  Offline = 'offline',
}
