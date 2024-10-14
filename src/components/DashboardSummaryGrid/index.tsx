"use client";

import { useState } from "react";
import SummarySideBar from "../SummarySideBar";
import DashboardSummaryCard from "../DashboardSummaryCard";

export default function DashboardSummaryGrid({
  summaries,
  tags,
}: {
  summaries: any[] | null;
  tags: any[] | null;
}) {
  const [summary, setSummary] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (value: any) => {
    setIsOpen(!isOpen);
    setSummary(value);
  };

  return (
    <>
      {summaries && (
        <>
          <ul className="min-h-[11rem] relative grid grid-cols-3 max-[1100px]:grid-cols-2 max-[750px]:grid-cols-1 gap-3">
            {summaries.map((summary) => (
              <DashboardSummaryCard
                key={summary.id}
                summary={summary}
                onClick={handleClick}
              />
            ))}
          </ul>
          <SummarySideBar
            summary={summary}
            tags={tags}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </>
      )}
      {!summaries && (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <span className="text-3xl font-extrabold text-base-placeholder dark:text-dark-base-placeholder">
            Nenhum Rascunho
          </span>
        </div>
      )}
    </>
  );
}
