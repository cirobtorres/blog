import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import Image from "@tiptap/extension-image";

function ImageNode(props: any) {
  const { src, alt } = props.node.attrs;

  let className = "relative mb-4";
  if (props.selected) {
    className += " ProseMirror-selectednode";
  }

  const { updateAttributes } = props;

  const onEditAlt = () => {
    const newAlt = prompt("Set alt text:", alt || "");
    updateAttributes({ alt: newAlt });
  };

  return (
    <NodeViewWrapper className={className} data-drag-handle>
      <img src={src} alt={alt} />
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 px-4 py-1 rounded bg-base-200 alt-text-indicator">
        {alt ? (
          <span className="font-extrabold text-green-600">✔</span>
        ) : (
          <span className="font-extrabold text-red-600">!</span>
        )}
        {alt ? (
          <span className="text-base-neutral">
            Alt text: &ldquo;{alt}&rdquo;.
          </span>
        ) : (
          <span className="text-base-neutral">Alt text missing.</span>
        )}
        <button
          className="font-extrabold text-blue-600"
          type="button"
          onClick={onEditAlt}
        >
          Edit
        </button>
      </span>
    </NodeViewWrapper>
  );
}

export default Image.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ImageNode);
  },
});
