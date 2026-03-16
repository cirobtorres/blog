import { JSX } from "react";
import { toast } from "sonner";

export const sonnerToastPromise = (
  promise: Promise<ArticleState>,
  success: (data: ArticleState) => JSX.Element,
  error: (data: ArticleState) => JSX.Element,
  loading: string = "Carregando...",
) => {
  return toast.promise(promise, {
    loading,
    success: (data) => success(data),
    error: (data) => error(data),
    classNames: {
      toast:
        "rounded-lg! text-neutral-900! border-stone-300! bg-stone-200! dark:text-neutral-100! dark:border-stone-700! dark:bg-stone-800!",
      // icon: "",
      // loading: "",
      content: "w-full",
      title: "w-full flex justify-between items-center",
      // description: "",
      // closeButton: "",
    },
  });
};
