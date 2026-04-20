"use client";

import React from "react";

type AuthProviderProps = {
  user: SessionUser | null;
};

export const AuthContext = React.createContext<AuthProviderProps | undefined>(
  undefined,
);

export default function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: SessionUser | null;
}) {
  return (
    <AuthContext.Provider value={{ user: initialUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context)
    throw new Error(
      "useAuth must be invoked only from inside of an 'AuthProvider'",
    );
  return context;
};
