"use client";

import { useArticleStore } from "../../../../providers/ArticleStoreProvider";

export default function BlocksInput() {
  const blocks = useArticleStore((s) => s.blocks);
  return <input type="hidden" name="body" value={JSON.stringify(blocks)} />;
}
