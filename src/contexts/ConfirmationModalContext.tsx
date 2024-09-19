"use client";

import { useState, createContext } from "react";

type ConfirmationModalProps = {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
};

const ConfirmationModalContext = createContext<ConfirmationModalProps>(
  {} as ConfirmationModalProps
);

export function ConfirmationModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ConfirmationModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </ConfirmationModalContext.Provider>
  );
}

export default ConfirmationModalContext;
export const ConfirmationModalConsumer = ConfirmationModalContext.Consumer;
