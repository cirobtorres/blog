"use client";

import React from "react";
import { highlightCodeWithShiki } from "../../../utils/shiki";
import CopyToClipBoard from "../../CopyToClipBoard";
import Spinner from "../../Spinner";

const decodeHTMLEntities = (text: string) => {
  if (typeof window === "undefined") {
    return text; // fallback (SSR)
  }
  const parser = new DOMParser();
  const decoded = parser.parseFromString(text, "text/html");
  return decoded.documentElement.textContent || "";
};

export default function CodeRenderer({ filename, code, language }: CodeEditor) {
  const [shikiCode, setShikiCode] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    (async () => {
      const highlightedCode = await highlightCodeWithShiki({
        language,
        code,
      });
      setShikiCode(highlightedCode);
      setLoading(false);
    })();
  }, [language, code]);

  return (
    <div className="mt-6 overflow-hidden flex flex-col rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-200 dark:bg-stone-900">
      <div className="relative grid items-center justify-between grid-cols-[1fr_90px] gap-2 p-2 border-b border-stone-300 dark:border-stone-700">
        <span className="text-sm truncate text-neutral-400 dark:text-neutral-500">
          {filename}
        </span>
        <CopyToClipBoard
          toCopy={decodeHTMLEntities(code)}
          className="w-fit ml-auto mr-0"
        />
      </div>
      <div className="w-full flex-1 flex items-center min-h-11">
        {loading ? (
          <Spinner className="mx-auto" />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: shikiCode }}
            className="overflow-auto w-full flex-1 max-w-full min-w-0 [&_pre_code]:max-h-100 [&_pre_code]:py-4"
          />
        )}
      </div>
    </div>
  );
}
