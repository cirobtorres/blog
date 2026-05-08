"use client";

import React from "react";
import { highlightCodeWithShiki } from "../../../utils/shiki";
import CopyToClipBoard from "../../CopyToClipBoard";
import Spinner from "../../Spinner";

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
    <div className="mt-6 overflow-hidden flex flex-col rounded border border-stone-300 dark:border-stone-700 bg-stone-200 dark:bg-stone-900">
      <div className="relative flex items-center justify-between p-2 border-b border-stone-300 dark:border-stone-700">
        <span className="text-sm text-neutral-400 dark:text-neutral-500">
          {filename}
        </span>
        <CopyToClipBoard toCopy={code} />
      </div>
      <div className="flex items-center justify-center min-h-11">
        {loading ? (
          <Spinner />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: shikiCode }}
            className="overflow-auto max-w-full min-w-0 [&_pre_code]:max-h-100 [&_pre_code]:py-4"
          />
        )}
      </div>
    </div>
  );
}
