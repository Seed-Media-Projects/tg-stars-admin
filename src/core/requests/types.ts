import { AccountItem } from '@core/accounts';

export type AdminRequestResponse = {
  confirmed: AdminRequestItem[];
  nonconfirmed: AdminRequestItem[];
};
export type AdminRequestItem = {
  id: number;
  requestData: RequestData;
  requestStatus: RequestStatus;
  created: string;
  updated: string;
  requestAssignees: UserRequestAssigneeItem[];
};

export type UserRequestAssigneeItem = {
  id: number;
  user_request_id: number;
  admin_user_account_id: number;
  assign: string;
  confirmed: string | null;
  unassign: string | null;
  user: AccountItem;
};

export enum RequestStatus {
  Created = 'created',
  Processing = 'processing',
  Confirmed = 'confirmed',
}

export type RequestDataStars = {
  type: 'stars';
  amount: number;
  username: string;
  email: string;
};
export type RequestDataPremium = {
  type: 'premium';
  amount: number;
  username: string;
  email: string;
  duration: '1m' | '3m' | '6m' | '12m';
};

export type RequestData = RequestDataStars | RequestDataPremium;

export type WorkRequest = {
  id: number;
  requestData: RequestData;
  requestStatus: RequestStatus;
  created: string;
  updated: string;
  user_id: number;
};

export type WorkRequestAssignItem = {
  id: number;
  user_request_id: number;
  admin_user_account_id: number;
  assign: string;
  request: WorkRequest;
};
