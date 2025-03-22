import { RequestData, RequestStatus } from '@core/requests';

export type UserListItem = BaseUserInfo & {
  allowsWriteToPm: boolean;
  isPremium: boolean;
  paymentEligible: boolean;
  language: 'ru' | 'en';
};
export type BaseUserInfo = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  tgUserId: number;
  photoUrl: string;
};

export type UserInfo = BaseUserInfo & {
  allowsWriteToPm: boolean;
  isPremium: boolean;
  paymentEligible: boolean;
  language: 'ru' | 'en';
  requests: UserRequestItem[];
  transactions: UserTransactionItem[];
};

export type UserRequestItem = {
  id: number;
  requestData: RequestData;
  requestStatus: RequestStatus;
  created: string;
  updated: string;
  user_id: number;
};

export enum UserTransactionType {
  Payment = 'payment',
}

export enum PaymentStatus {
  Accept = 'ACCEPT',
  Wait = 'WAIT',
}

export type UserTransactionDataPayment = {
  type: string;
  notes: string;
  status: PaymentStatus;
  amount: number;
  orderId: string;
  amountPaymentHub: number;
  merchant: string;
  requestId?: number;
};

export type UserTransactionData = UserTransactionDataPayment;

export type UserTransactionItem = {
  id: string;
  type: UserTransactionType;
  transactionData: UserTransactionData;
  created: string;
  user_id: 1;
};
