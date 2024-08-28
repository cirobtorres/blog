import Link from "next/link";

const LinkAnchorTracker = ({ links }: { links: { text: string }[] }) => {
  return (
    <nav className="w-[350px] flex-shrink-0 h-full sticky top-16 bottom-16 mt-16">
      <ul className="text-right opacity-0 pb-6 -translate-x-8 transition-all duration-300 animate-jump-link-tracker">
        <h2 className="font-extrabold text-2xl p-6 text-base-neutral dark:text-dark-base-neutral">
          Conteúdo
        </h2>
        <div className="h-full max-h-[70vh] overflow-auto scrollbar dark:dark-scrollbar px-6">
          {links.map((link, index) => (
            <li key={index} className="mb-1">
              <Link
                href={`#anchor-${index + 1}`}
                className="text-sm text-base-neutral dark:text-dark-base-neutral hover:text-base-green-hover hover:dark:text-dark-base-green-hover"
              >
                {link.text}
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </nav>
  );
};

export default LinkAnchorTracker;
