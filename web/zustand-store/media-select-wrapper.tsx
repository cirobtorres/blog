"use client";

import { useArticleStore } from "./article-state";

export function MediaSelectWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const selectImage = useArticleStore((state) => state.selectImage);
  const activeTarget = useArticleStore((state) => state.activeMediaTarget);

  return (
    <div
    // onClick={() => {
    //   selectImage(url);
    //   // Aqui você pode disparar um evento para fechar o Modal se quiser
    // }}
    // className={`cursor-pointer transition-all ${activeTarget ? "hover:ring-2 ring-primary" : ""}`}
    >
      {children}
    </div>
  );
}
