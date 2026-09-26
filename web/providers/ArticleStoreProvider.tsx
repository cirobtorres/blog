"use client";

import React from "react";
import { createArticleStore } from "../zustand-store/article-state";
import { useStore } from "zustand";

const ArticleStoreContext = React.createContext<ArticleStoreApi | null>(null);

export function ArticleStoreProvider({
  children,
  initial,
}: {
  children: React.ReactNode;
  initial?: Parameters<typeof createArticleStore>[0];
}) {
  const [store] = React.useState(() => createArticleStore(initial));

  return (
    <ArticleStoreContext.Provider value={store}>
      {children}
    </ArticleStoreContext.Provider>
  );
}

export function useArticleStore(): ArticleState;
export function useArticleStore<T>(selector: (s: ArticleState) => T): T;
export function useArticleStore<T>(selector?: (s: ArticleState) => T) {
  const store = React.useContext(ArticleStoreContext);
  if (!store) throw new Error("useArticleStore fora do ArticleStoreProvider");
  return useStore(store, selector as (state: ArticleState) => T);
}
