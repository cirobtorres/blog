import TagDelete from "./TagDelete";

export default function TagFilter({ tags }: { tags: Tag[] }) {
  return tags?.length > 0 ? (
    <ul className="grid grid-cols-3 gap-2">
      {tags.map((tag) => (
        <li
          key={tag.id}
          className="text-sm break-all flex justify-between items-center p-1 pl-2 border rounded-lg bg-stone-200 dark:bg-stone-900"
        >
          <span className="w-full truncate italic text-neutral-600 dark:text-neutral-500">
            {tag.name}
          </span>
          <TagDelete tag={tag} />
        </li>
      ))}
    </ul>
  ) : (
    <span className="text-neutral-700">Nenhuma tag...</span>
  );
}
