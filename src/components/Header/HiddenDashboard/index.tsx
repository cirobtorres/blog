import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/lib/authentication";
import { User } from "@supabase/supabase-js";

export default function HiddenDashboard({
  user,
  privileges,
}: {
  user: User | null;
  privileges: number | null;
}) {
  return user ? (
    <>
      <li className="flex items-center gap-2">
        <Image
          src={user.user_metadata.picture || "/images/user-placeholder.png"}
          alt={`Avatar do usuário${
            user.user_metadata.picture ? " " + user.user_metadata.name : ""
          }`}
          width={30}
          height={30}
          className="rounded-full"
        />
        <div className="flex items-center max-w-48 text-sm text-base-neutral dark:text-dark-base-neutral">
          <Link
            href="/painel/configurar"
            className="w-full truncate font-extrabold hover:underline"
          >
            {user.user_metadata.name || user.email}
          </Link>
          <div className="flex-shrink-0 w-[1px] h-4 mx-2 bg-base-neutral dark:bg-dark-base-neutral" />
          <button
            onClick={(event) => {
              event.preventDefault();
              signOut();
            }}
            className="flex-shrink-0 hover:underline"
          >
            Sair
          </button>
        </div>
      </li>
      {(privileges === 2 || privileges === 3) && (
        <li>
          <Link
            href="/painel"
            className="h-fit flex justify-center items-center px-2 py-1 rounded font-extrabold text-xs text-base-100 dark:text-base-100 border border-[#359b50] dark:border-[#9af1b1] bg-base-green hover:bg-base-green-hover dark:bg-dark-base-green dark:hover:bg-dark-base-green-hover"
          >
            Painel
          </Link>
        </li>
      )}
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
