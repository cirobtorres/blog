"use client";

import React, { useState } from "react";

type AuthProviderProps = {
  user: SessionUser;
  loading: boolean;
};

export const AuthContext = React.createContext<AuthProviderProps | undefined>(
  undefined,
);

export default function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: SessionUser;
}) {
  const [loading] = useState(false);

  return (
    <AuthContext.Provider value={{ user: initialUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth must be invoked only from inside of an 'AuthProvider'",
    );
  }
  return context;
};
