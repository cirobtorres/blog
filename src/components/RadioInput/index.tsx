const RadioInput = <T extends string>({
  id,
  name,
  label,
  helpText,
  value,
  setValue,
  checkedValue,
  Icon,
}: {
  id: string;
  name: string;
  label: string;
  helpText: string;
  value: T;
  setValue: (value: T) => void;
  checkedValue: T;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) => {
  return (
    <div className="flex items-center gap-4">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={() => setValue(value)}
        checked={value === checkedValue}
        className="hidden peer"
      />
      <div
        className={`relative size-3 rounded-full outline outline-1 outline-offset-2 ${
          value === checkedValue
            ? "outline-base-green dark:outline-dark-base-green"
            : "outline-base-neutral dark:outline-dark-base-neutral"
        } peer-checked:[&_div]:size-full overflow-hidden`}
      >
        <div className="transition-all absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-0 rounded-full bg-base-green dark:bg-dark-base-green" />
      </div>
      <label htmlFor={id} className="flex items-center gap-4 cursor-pointer">
        <Icon className="text-xl text-base-neutral dark:text-dark-base-neutral" />
        <p className="flex flex-col text-base-neutral dark:text-dark-base-neutral">
          <span className="font-extrabold text-base-green dark:text-dark-base-green">
            {label}
          </span>
          <span className="text-xs">{helpText}</span>
        </p>
      </label>
    </div>
  );
};

export default RadioInput;
