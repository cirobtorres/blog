"use client";

import { useState, createContext } from "react";

type ArticleSideBarProps = {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  title: string;
  setTitle: (value: string) => void;
  id: string;
  setId: (value: string) => void;
  subtitle: string;
  setSubtitle: (value: string) => void;
  slug: string;
  setSlug: (value: string) => void;
  updatedAt: string;
  setUpdatedAt: (value: string) => void;
  createdAt: string;
  setCreatedAt: (value: string) => void;
  privateArticle: "private" | "public";
  setPrivateArticle: (value: boolean) => void;
  blockedForReplies: "blocked" | "unblocked";
  setBlockedForReplies: (value: boolean) => void;
};

const ArticleSideBarContext = createContext<ArticleSideBarProps>(
  {} as ArticleSideBarProps
);

export function ArticleSideBarContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [slug, setSlug] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [privateArticle, setPrivate] = useState<"private" | "public">(
    "private"
  );
  const [blockedForReplies, setBlocked] = useState<"blocked" | "unblocked">(
    "blocked"
  );

  const setIsOpen = (value: boolean) => {
    if (value) {
      document.body.classList.add("modal-shown");
      setOpen(true);
    } else {
      document.body.classList.remove("modal-shown");
      setOpen(false);
    }
    return document.body.classList.remove("modal-shown");
  };

  const setPrivateArticle = (value: boolean) => {
    setPrivate(value ? "private" : "public");
  };

  const setBlockedForReplies = (value: boolean) => {
    setBlocked(value ? "blocked" : "unblocked");
  };

  return (
    <ArticleSideBarContext.Provider
      value={{
        isOpen,
        setIsOpen,
        title,
        setTitle,
        id,
        setId,
        subtitle,
        setSubtitle,
        slug,
        setSlug,
        updatedAt,
        setUpdatedAt,
        createdAt,
        setCreatedAt,
        privateArticle,
        setPrivateArticle,
        blockedForReplies,
        setBlockedForReplies,
      }}
    >
      {children}
    </ArticleSideBarContext.Provider>
  );
}

export default ArticleSideBarContext;
export const ArticleSideBarConsumer = ArticleSideBarContext.Consumer;
