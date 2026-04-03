"use client";

import React from "react";

const ArticleContext = React.createContext<any>(null);

export function ArticleProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = React.useState({ title: "", bannerUrl: "" });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <ArticleContext.Provider value={{ formData, updateField }}>
      {children}
    </ArticleContext.Provider>
  );
}

export const useArticle = () => React.useContext(ArticleContext);
