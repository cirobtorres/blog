"use client";

import React from "react";

const FileContext = React.createContext<FileContextType | undefined>(undefined);

export function FileProvider({ children }: { children: React.ReactNode }) {
  const [selectedItems, setSelectedItems] = React.useState<Media[]>([]);

  const toggleItem = (item: Media) => {
    setSelectedItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item],
    );
  };

  const selectAll = (items: Media[]) => setSelectedItems(items);

  const clearSelection = () => setSelectedItems([]);

  return (
    <FileContext.Provider
      value={{ selectedItems, toggleItem, selectAll, clearSelection }}
    >
      {children}
    </FileContext.Provider>
  );
}

export const useFile = () => {
  const context = React.useContext(FileContext);
  if (!context)
    throw new Error("useFile deve ser usado dentro de FileProvider");
  return context;
};
