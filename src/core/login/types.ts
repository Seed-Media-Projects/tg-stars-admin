export type AuthResponse = {
  token: string;
  user: {
    username: string;
    role: AdminUserRole;
    id: string;
  };
};

export enum AdminUserRole {
  Admin = 'admin',
  Manager = 'manager',
}
