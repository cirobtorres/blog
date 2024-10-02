"use client";

import { submitTagCreate } from "@/lib/tags";
import { User } from "@supabase/supabase-js";
import { useFormState } from "react-dom";

const TagCreate = ({ user }: { user: User }) => {
  const [state, action] = useFormState<State, FormData>(submitTagCreate, {
    errors: null,
  });
  return (
    <form action={action}>
      <div className="flex flex-col gap-1 mb-4">
        <input
          type="hidden"
          id="tag-creator"
          name="tag-creator"
          value={user.id}
        />
        <label
          htmlFor="tag-name"
          className="transition-colors duration-200 text-base-neutral dark:text-dark-base-neutral cursor-pointer hover:text-base-neutral-hover hover:dark:text-[#fff]"
        >
          Nome da tag
        </label>
        <div className="flex gap-1 max-w-96">
          <div className="w-full">
            <input
              type="text"
              id="tag-name"
              name="tag-name"
              className="w-full h-8 rounded px-2 text-sm transition-[outline] duration-200 text-base-neutral dark:text-dark-base-neutral outline-none outline-2 outline-transparent -outline-offset-2 focus:outline-blue-500 border border-base-border dark:border-dark-base-border bg-inherit placeholder:text-base-placeholder dark:placeholder:text-dark-base-placeholder"
            />
            {state.title && (
              <div className="py-2">
                <p className="text-xs text-base-red dark:text-dark-base-red">
                  {state.title}
                </p>
              </div>
            )}
          </div>
          <div
            className="w-16" // w-full max-w-[100px]
          >
            <button
              type="submit"
              className="h-8 w-full flex justify-center items-center px-2 py-1 rounded font-extrabold text-sm text-base-100 dark:text-base-100 border border-[#359b50] dark:border-[#9af1b1] bg-base-green hover:bg-base-green-hover dark:bg-dark-base-green dark:hover:bg-dark-base-green-hover"
            >
              <p className="font-extrabold text-base-100 dark:text-base-100">
                Criar
              </p>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export { TagCreate };
