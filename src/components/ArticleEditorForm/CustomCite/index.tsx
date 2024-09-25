import { Node, mergeAttributes } from "@tiptap/core";

const CustomCite = Node.create({
  name: "cite",
  group: "block",
  content: "inline*",
  parseHTML() {
    return [
      {
        tag: "cite",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["cite", mergeAttributes(HTMLAttributes), 0];
  },
});

export default CustomCite;
