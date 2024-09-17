import { signOut } from "@/lib/authentication";
import Link from "next/link";

export default function HiddenDashboard({
  name,
  privileges,
}: {
  name: string;
  privileges: number | null;
}) {
  return privileges === 2 || privileges === 3 ? (
    <>
      <li>
        <p className="text-sm text-base-neutral dark:text-dark-base-neutral">
          Olá, <strong>{name}</strong>
          <br />
          <button
            onClick={(event) => {
              event.preventDefault();
              signOut();
            }}
            className="hover:underline"
          >
            Sair
          </button>
        </p>
      </li>
      <li>
        <Link
          href="/painel"
          className="flex justify-center items-center px-2 py-1 rounded-xl font-extrabold text-sm text-base-100 dark:text-base-100 border border-[#359b50] dark:border-[#9af1b1] bg-base-green hover:bg-base-green-hover dark:bg-dark-base-green dark:hover:bg-dark-base-green-hover"
        >
          Painel
        </Link>
      </li>
    </>
  ) : (
    <li className="h-full">
      <Link
        href="/entrar"
        className="flex justify-center items-center h-full text-base-neutral dark:text-dark-base-neutral hover:text-base-green dark:hover:text-dark-base-green"
      >
        Entrar
      </Link>
    </li>
  );
}
