import { apiClientUrls } from "../../../config/routes";
import { cn, focusRing } from "../../../utils/variants";

const MicrosoftLink = ({
  className,
  ...props
}: Omit<React.ComponentProps<"a">, "href"> & {
  className?: string;
}) => {
  return (
    <a
      {...props}
      href={apiClientUrls.microsoft}
      target="_self"
      className={cn(
        "w-full h-10.5 flex justify-center items-center gap-2 rounded cursor-pointer duration-300 text-base shadow font-medium transition-[background-color,box-shadow] bg-stone-200/50 dark:bg-stone-800 border dark:border-stone-700 focus-visible:border-stone-400 dark:hover:border-stone-700 dark:focus-visible:border-stone-700 hover:text-neutral-900 dark:hover:text-neutral-100",
        focusRing,
        className,
      )}
    >
      <MicrosoftLogoSvg />
      Microsoft
    </a>
  );
};

const MicrosoftLogoSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
  >
    <path fill="#F35325" d="M1 1h6.5v6.5H1V1z" />
    <path fill="#81BC06" d="M8.5 1H15v6.5H8.5V1z" />
    <path fill="#05A6F0" d="M1 8.5h6.5V15H1V8.5z" />
    <path fill="#FFBA08" d="M8.5 8.5H15V15H8.5V8.5z" />
  </svg>
);

export default MicrosoftLink;
export { MicrosoftLogoSvg };
