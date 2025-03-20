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
};
