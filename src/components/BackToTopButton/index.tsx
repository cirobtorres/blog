import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTopButton({
  diameter = 75,
  strokeWidth = 7,
}: {
  diameter?: number;
  strokeWidth?: number;
}) {
  const outerRadius = diameter / 2;
  const innerRadius = diameter / 2 - strokeWidth * 2;
  const circunference = 2 * Math.PI * innerRadius;
  const [progress, setProgress] = useState(circunference);

  const listenToScrollBackToTopButton = () => {
    const elementHeight = document.getElementById("main-article")?.scrollHeight;
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      if (elementHeight) {
        const percentage =
          scrollTop < elementHeight ? (scrollTop / elementHeight) * 100 : 100;
        setProgress(circunference - (circunference * percentage) / 100);
      }
    });
  };

  useEffect(() => {
    listenToScrollBackToTopButton();
    // cleanup function
    return () => {
      window.removeEventListener("scroll", listenToScrollBackToTopButton);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo(0, 0)}
      className="relative flex group"
      style={{ height: `${diameter}px` }}
    >
      <div className="relative">
        <svg
          className="relative -rotate-90"
          style={{ width: `${diameter}px`, height: `${diameter}px` }}
        >
          <circle
            cx={outerRadius}
            cy={outerRadius}
            r={`${innerRadius}px`}
            strokeWidth={`${strokeWidth}px`}
            strokeDasharray={circunference}
            className="w-fit h-fit fill-none stroke-slate-200 dark:stroke-slate-600"
            style={{ strokeDashoffset: 0 }}
          />
          <circle
            cx={outerRadius}
            cy={outerRadius}
            r={`${innerRadius}px`}
            strokeWidth={`${strokeWidth}px`}
            strokeDasharray={circunference}
            // stroke="" // stroke color
            className="w-fit h-fit fill-none stroke-base-green dark:stroke-dark-base-green"
            style={{ strokeDashoffset: progress }}
          />
        </svg>
        <FaArrowUp
          className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 
          text-xl text-base-neutral dark:text-dark-base-neutral 
          group-hover:animate-back-to-top-button
        `}
        />
      </div>
      <p
        className={`
          transition-opacity duration-200 opacity-0 group-hover:opacity-100 pointer-events-none 
          absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded 
          text-base-neutral dark:text-dark-base-neutral bg-base-150 dark:bg-dark-base-150 
          before:w-0 before:h-0 before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2 
          before:border-8 before:border-t-0 before:border-transparent 
          before:border-b-base-150 before:dark:border-b-dark-base-150 
        `}
      >
        Voltar ao topo
      </p>
    </button>
  );
}
