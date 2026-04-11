import { JSX } from "react";
import { toast } from "sonner";

export const sonnerPromise = (
  promise: Promise<ActionState>,
): Promise<ActionState> => {
  return new Promise((resolve, reject) => {
    promise
      .then((data) => {
        if (data.ok) {
          resolve(data);
        } else {
          reject(data);
        }
      })
      .catch((e) => {
        reject({ ok: false, error: "Erro inesperado", data: null });
      });
  });
};

export const sonnerToastPromise = (
  promise: Promise<ActionState>,
  success: (data: ActionState) => JSX.Element,
  error: (data: ActionState) => JSX.Element,
  loading: string = "Carregando...",
) => {
  return toast.promise(promise, {
    loading,
    success: (data) => success(data),
    error: (data) => error(data),
    classNames: {
      toast:
        "rounded-lg! text-neutral-900! border-stone-300! bg-stone-200! dark:text-neutral-100! dark:border-stone-700! dark:bg-stone-800!",
      content: "w-full",
      title: "w-full flex justify-between items-center",
      // icon: "",
      // loading: "",
      // description: "",
      // closeButton: "",
    },
  });
};
