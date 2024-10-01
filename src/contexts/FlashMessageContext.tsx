"use client";

import { useState, createContext, useEffect } from "react";

type FlashMessageProps = {
  show: boolean;
  label: string;
  type: "info" | "error" | "warning" | "success";
  setShow: (bool: boolean) => void;
  setLabel: (value: string) => void;
  setType: (value: "info" | "error" | "warning" | "success") => void;
};

const FlashMessageContext = createContext<FlashMessageProps>(
  {} as FlashMessageProps
);

export function FlashMessageContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const [label, setLabel] = useState("");
  const [type, setType] = useState<"info" | "error" | "warning" | "success">(
    "success"
  );

  return (
    <FlashMessageContext.Provider
      value={{
        show,
        label,
        type,
        setShow,
        setLabel,
        setType,
      }}
    >
      {children}
    </FlashMessageContext.Provider>
  );
}

export default FlashMessageContext;
export const FlashMessageConsumer = FlashMessageContext.Consumer;
