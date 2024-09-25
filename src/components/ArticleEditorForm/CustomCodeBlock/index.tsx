import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

export default function CustomCodeBlock({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}: {
  node: { attrs: { language: string } }; // TODO: reformat this
  updateAttributes: ({}) => void; // TODO: reformat this
  extension: any; // TODO: reformat this
}) {
  return (
    <NodeViewWrapper>
      <pre lang="javascript" className="relative">
        <div>
          <select
            contentEditable={false}
            defaultValue={defaultLanguage}
            onChange={(event) =>
              updateAttributes({ language: event.target.value })
            }
            className="absolute right-3 top-3 appearance-none text-dark-base-neutral bg-dark-base-200 rounded transition-[outline] duration-200 outline outline-2 outline-transparent focus:outline-blue-500 border border-dark-base-border px-3 m-0 cursor-pointer"
          >
            <option value="null">auto</option>
            <option
              disabled
              className="text-base-green dark:text-dark-base-green"
            >
              —
            </option>
            {extension.options.lowlight
              .listLanguages()
              .map((lang: string, index: number) => (
                <option key={index} value={lang}>
                  {lang}
                </option>
              ))}
          </select>
        </div>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
}
