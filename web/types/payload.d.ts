type AuthTokensPayload = {
  iss: string;
  sub: string;
  exp: number;
  iat: number;
  type: string;
  authorities: string[];
};
