import Link from "next/link";

const header = [
  {
    path: "/",
    text: "Consectetur",
  },
  {
    path: "/",
    text: "Cecessitatibus",
  },
  {
    path: "/",
    text: "Consectetur",
  },
  {
    path: "/",
    text: "Accusamus",
  },
  {
    path: "/",
    text: "Dignissimos",
  },
];

export default function Header() {
  return (
    <header className="flex items-center px-6 border-b border-zinc-900 dark:bg-zinc-950">
      <div className="w-full flex items-center justify-between max-w-360 mx-auto">
        <nav className="flex gap-6">
          {header.map(({ path, text }, index) => (
            <Link
              key={index}
              href={path}
              className="text-sm font-semibold font-sans text-zinc-500 transition-colors hover:text-zinc-50"
            >
              {text}
            </Link>
          ))}
        </nav>
        <div />
      </div>
    </header>
  );
}
