import { cn, hoverRing } from "../../utils/variants";
import { focusWithinRing } from "./utils";

export function ArticleEditorSubtitle({ id }: { id: string }) {
  const subtitleId = "title-" + id;
  return (
    <fieldset
      className={cn(
        "relative p-2 pt-6 pr-1 flex flex-col rounded-sm transition-all duration-300 border bg-container not-dark:shadow",
        hoverRing,
        focusWithinRing,
      )}
    >
      <textarea
        id={subtitleId}
        name={subtitleId}
        // value={value}
        rows={2}
        maxLength={256}
        spellCheck={false}
        // onChange={(e) => setVal(e.target.value)}
        placeholder=""
        className="resize-none text-sm rounded transition-all outline-none border-none bg-none peer scrollbar"
      />
      <label
        id={"label-" + subtitleId}
        htmlFor={subtitleId}
        className="absolute origin-left select-none pointer-events-none font-medium pl-3 top-6 transform transition-top duration-100 left-0 text-neutral-500 peer-placeholder-shown:left-0 peer-placeholder-shown:translate-x-0 -translate-y-5 peer-focus:-translate-y-5 peer-placeholder-shown:translate-y-0 translate-x-0 peer-focus:translate-x-0 scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100"
      >
        Subtítulo do Artigo
      </label>
    </fieldset>
  );
}
