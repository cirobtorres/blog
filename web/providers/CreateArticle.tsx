"use client";

import React from "react";

interface ArticleFormData {
  title: string;
  bannerUrl: string;
}

interface ArticleContextValue {
  formData: ArticleFormData;
  updateField: (field: keyof ArticleFormData, value: string) => void;
}

const ArticleContext = React.createContext<ArticleContextValue | null>(null);

export function ArticleProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = React.useState<ArticleFormData>({
    title: "",
    bannerUrl: "",
  });

  const updateField = (field: keyof ArticleFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <ArticleContext.Provider value={{ formData, updateField }}>
      {children}
    </ArticleContext.Provider>
  );
}

export const useArticle = () => React.useContext(ArticleContext);
