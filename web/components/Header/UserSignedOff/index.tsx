import { Link } from "../../Links";
import { publicWebUrls } from "../../../routing/routes";
import { Popover, PopoverContent, PopoverTrigger } from "../../Popover";

export default function UserSignedOff() {
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer flex justify-center items-center ml-auto mr-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-8 p-1 border rounded-full not-default:shadow bg-stone-100 border-stone-300 dark:border-stone-700 dark:bg-stone-800"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-30 flex flex-col gap-0 p-1 bg-stone-200 dark:bg-stone-900 [&_a]:text-sm [&_a]:font-normal [&_a]:text-neutral-900 [&_a]:dark:text-neutral-100 [&_a]:transition-background [&_a]:duration-300 [&_a]:hover:bg-stone-300 dark:[&_a]:hover:bg-stone-800 [&_a]:w-full [&_a]:py-1 [&_a]:px-2"
      >
        <Link href={publicWebUrls.signIn}>Entrar</Link>
        <Link href={publicWebUrls.signUp}>Cadastrar</Link>
      </PopoverContent>
    </Popover>
  );
}
