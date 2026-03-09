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

type SessionUser =
  | {
      ok: true;
      data: User;
    }
  | {
      ok: false;
      data: null;
    };
