type AuthSession = { ok: true; data: User } | { ok: false; data: null };

type User = {
  id: string;
  name: string;
  email: string;
  isProviderEmailVerified: boolean;
  authorities: string[];
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
