export type LoginProvider = 'google' | 'github';

export type Session = {
  id: string;
  username: string;
  email: string;
  image: string;
  authProvider: 'Google' | 'GitHub';
  createdAt: Date;
};
