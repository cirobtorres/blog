"use client";

import { useFormState } from "react-dom";
import { User } from "@supabase/supabase-js";
import { tagCreate } from "@/lib/tag";
import { IoClose } from "react-icons/io5";
import CreateTagButton from "./CreateTagButton";

const TagCreate = ({ user }: { user: User }) => {
  const [state, action] = useFormState<State, FormData>(tagCreate, {
    errors: null,
  });
  return (
    <form action={action} className="my-4">
      <div className="flex flex-col gap-1 mb-4">
        <input
          type="hidden"
          id="tag-creator"
          name="tag-creator"
          value={user.id}
        />
        <label
          htmlFor="tag-name"
          className="w-fit text-xl font-extrabold transition-colors duration-200 text-base-neutral dark:text-dark-base-neutral cursor-pointer hover:text-base-neutral-hover hover:dark:text-[#fff]"
        >
          Criar tag
        </label>
        <div className="flex gap-2 max-w-[400px] max-[450px]:flex-col">
          <div className="w-full">
            <div className="relative w-full max-w-md h-8 rounded overflow-hidden transition-[outline] duration-200 outline outline-2 outline-transparent -outline-offset-1 focus-within:outline-blue-500 border border-base-border dark:border-dark-base-border">
              <input
                type="text"
                id="tag-name"
                name="tag-name"
                maxLength={50}
                className="w-full h-full pr-7 pl-1.5 pt-1 pb-1.5 flex items-center text-xs placeholder:text-xs placeholder:text-dark-base-placeholder text-base-neutral dark:text-dark-base-neutral border-none outline-none bg-transparent"
              />
              <button
                type="reset"
                tabIndex={-1}
                onClick={(event) => {
                  const inputElement = document.getElementById("tag-name");
                  inputElement?.focus();
                }}
                className="absolute top-1/2 -translate-y-1/2 right-2 hover:text-base-red dark:hover:text-dark-base-red text-sm text-base-neutral dark:text-dark-base-neutral"
              >
                <IoClose />
              </button>
            </div>
            {state.title && (
              <div className="py-2">
                <p className="text-xs pl-2 text-base-red dark:text-dark-base-red">
                  {state.title}
                </p>
              </div>
            )}
          </div>
          <CreateTagButton />
        </div>
      </div>
    </form>
  );
};

export { TagCreate };
