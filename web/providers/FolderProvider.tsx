"use client";

import React from "react";

const SelectionContext = React.createContext<SelectionContextType | undefined>(
  undefined,
);

export function FolderProvider({ children }: { children: React.ReactNode }) {
  const [selectedItems, setSelectedItems] = React.useState<Folder[]>([]);

  const toggleItem = (item: Folder) => {
    setSelectedItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item],
    );
  };

  const selectAll = (items: Folder[]) => setSelectedItems(items);

  const clearSelection = () => setSelectedItems([]);

  return (
    <SelectionContext.Provider
      value={{ selectedItems, toggleItem, selectAll, clearSelection }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

export const useFolder = () => {
  const context = React.useContext(SelectionContext);
  if (!context)
    throw new Error("useFolder deve ser usado dentro de FolderProvider");
  return context;
};
