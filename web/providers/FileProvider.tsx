"use client";

import React from "react";

type FileContextType = {
  selectedItems: Media[];
  multiSelect: boolean;
  toggleItem: (item: Media) => void;
  selectAll: (items: Media[]) => void;
  clearSelection: () => void;
};

const FileContext = React.createContext<FileContextType | undefined>(undefined);

export function FileProvider({
  children,
  multiSelect = true,
}: {
  children: React.ReactNode;
  multiSelect?: boolean;
}) {
  const [selectedItems, setSelectedItems] = React.useState<Media[]>([]);

  const toggleItem = (item: Media) => {
    setSelectedItems((prev) => {
      if (prev.some((i) => i.id === item.id)) {
        return prev.filter((i) => i.id !== item.id);
      }
      return multiSelect ? [...prev, item] : [item]; // single: substitui
    });
  };

  const selectAll = (items: Media[]) =>
    setSelectedItems(multiSelect ? items : items.slice(0, 1));

  const clearSelection = () => setSelectedItems([]);

  return (
    <FileContext.Provider
      value={{
        selectedItems,
        multiSelect,
        toggleItem,
        selectAll,
        clearSelection,
      }}
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
