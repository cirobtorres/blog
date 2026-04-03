"use client";

import React from "react";
import { AddBlockButton } from "./blocks";

export default function ArticleBlockButtons() {
  const [blocks, setBlocks] = React.useState<Blocks[]>([]);
  return <AddBlockButton blocks={blocks} setBlocks={setBlocks} />;
}
