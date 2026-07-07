type AuthTokensPayload = {
  exp: number;
  iat: number;
  jti: string; // string:UUID
  iss: string; // URL
  aud: string[];
  sub: string; // UUID
  typ: string; // Bearer
  azp: string; // Next client_id
  sid: string;
  acr: string;
  "allowed-origins": string[];
  realm_access: {
    roles: string[];
  };
  resource_access: { account: { roles: string[] } };
  scope: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  email: string;
};
