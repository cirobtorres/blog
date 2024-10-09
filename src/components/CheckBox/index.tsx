import { ChangeEventHandler } from "react";

export default function CheckBox({
  id,
  text,
  setValue,
  checked = false,
  size = "large",
}: {
  id: string;
  text: string;
  setValue: ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
  size?: string;
}) {
  return (
    <label
      htmlFor={id}
      className={`${
        size === "large"
          ? "checkbox-wrapper-22 text-sm"
          : "checkbox-wrapper-16 text-xs"
      } checkbox-wrapper text-nowrap text-sm flex items-center gap-2 cursor-pointer w-fit text-base-neutral hover:text-base-neutral-hover dark:text-dark-base-neutral dark:hover:text-dark-base-neutral-hover`}
    >
      <span
        className={`checkbox dark:dark-checkbox relative inline-block [&>*]:absolute after:w-full after:block after:[padding-top:100%]`}
      >
        <input
          id={id}
          name={id}
          type="checkbox"
          onChange={setValue}
          checked={checked}
          className="block w-full h-full m-0 p-0 outline-none cursor-pointer bg-base-100 dark:bg-dark-base-100 [-webkit-appearance:none] [-moz-appearance:none] [-webkit-tap-highlight-color:transparent]"
        />
        <svg className="block w-full h-full fill-none left-0 top-0 pointer-events-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]">
          <use xlinkHref={`#checkbox-${id}`} className="checkbox"></use>
        </svg>
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol id={`checkbox-${id}`} viewBox="0 0 22 22">
          <path
            fill="none"
            d="M5.5,11.3L9,14.8L20.2,3.3l0,0c-0.5-1-1.5-1.8-2.7-1.8h-13c-1.7,0-3,1.3-3,3v13c0,1.7,1.3,3,3,3h13 c1.7,0,3-1.3,3-3v-13c0-0.4-0.1-0.8-0.3-1.2"
          />
        </symbol>
      </svg>
      {text}
    </label>
  );
}
