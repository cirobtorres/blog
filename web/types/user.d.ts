type AuthSessionConfirmed = { ok: true; data: User };

type AuthSession = { ok: true; data: User } | { ok: false; data: null };

type User = {
  id: string;
  name: string;
  providerEmail: string;
  isProviderEmailVerified: boolean;
  pictureUrl?: string;
  authorities: string[];
  createdAt: Date;
  updatedAt: Date;
};

type SessionUser = UserSignedIn | UserSignedOut;

type UserSignedIn = {
  ok: true;
  data: User;
};

type UserSignedOut = {
  ok: false;
  data: null;
};
