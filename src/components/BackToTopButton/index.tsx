import { FaArrowUp } from "react-icons/fa";

export default function BackToTopButton({
  diameter,
  strokeWidth,
  percentage = 0,
}: {
  diameter: number;
  strokeWidth: number;
  percentage: number;
}) {
  const outerRadius = diameter / 2;
  const innerRadius = diameter / 2 - strokeWidth * 2;
  const circunference = 2 * Math.PI * innerRadius;
  const progressBar = circunference - (circunference * percentage) / 100;
  return (
    <div className="relative flex" style={{ height: `${diameter}px` }}>
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
          ></circle>
          <circle
            cx={outerRadius}
            cy={outerRadius}
            r={`${innerRadius}px`}
            strokeWidth={`${strokeWidth}px`}
            strokeDasharray={circunference}
            stroke="#fbbf24"
            className="w-fit h-fit fill-none"
            style={{ strokeDashoffset: progressBar }}
          >
            <FaArrowUp className="text-3xl" />
          </circle>
        </svg>
      </div>
    </div>
  );
}
