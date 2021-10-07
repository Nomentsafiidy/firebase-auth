export type User = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  pseudo?: string;
  avatar?: boolean;
  dateCreate?: number;
  dateUpdate?: number;
  password: string;
  isFirstStart?: boolean;
  isAdmin?: boolean;
};

export type Login = Pick<User, 'email' | 'password'>;
