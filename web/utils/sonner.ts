import { JSX } from "react";
import { toast } from "sonner";

const defaultState: ActionState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export const toastStyles = {
  classNames: {
    toast:
      "rounded-lg! not-dark:shadow! text-neutral-900! dark:text-neutral-100! border-stone-300! dark:border-stone-700! bg-stone-100! dark:bg-stone-800!",
    content: "w-full text-neutral-900! dark:text-neutral-100!",
    title:
      "w-full flex justify-between items-center text-neutral-900! dark:text-neutral-100!",
    // icon: "",
    // loading: "",
    // description: "",
    // closeButton: "",
  },
};

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
        console.error("sonnerPromise error:", e);
        reject({ ...defaultState, error: "Erro de conexão ou servidor" });
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
    ...toastStyles,
  });
};
