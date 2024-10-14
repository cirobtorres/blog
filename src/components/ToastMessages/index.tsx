"use client";

import "react-toastify/dist/ReactToastify.css";
import "../../styles/globals.css";
import {
  ToastContainer,
  toast,
  ToastContent,
  ToastOptions,
  Id,
  Bounce,
} from "react-toastify";

type ToastType = "success" | "error" | "info" | "warning" | "default";

export const defaultToastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 8000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  pauseOnFocusLoss: true,
  theme: "light",
  transition: Bounce,
};

export const showToast = (
  type: ToastType,
  content: ToastContent,
  options: Partial<ToastOptions> = {}
): Id => {
  const optionsToApply = { ...defaultToastOptions, ...options };

  switch (type) {
    case "success":
      return toast.success(content, optionsToApply);
    case "error":
      return toast.error(content, optionsToApply);
    case "info":
      return toast.info(content, optionsToApply);
    case "warning":
      return toast.warn(content, optionsToApply);
    case "default":
      return toast(content, optionsToApply);
    default:
      return toast(content, optionsToApply);
  }
};

export default function ToastMessagesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const contextClass = {
    success: "border-[#2b813e] bg-dark-base-green",
    error: "border-dark-base-red bg-[#803d3d]",
    info: "border-dark-base-blue bg-[#274c5c]",
    warning: "border-dark-base-yellow bg-[#9e7d29]",
    default:
      "border-base-border bg-base-100 dark:border-dark-base-border dark:bg-dark-base-100",
  };

  return (
    <>
      {children}
      <ToastContainer
        toastClassName={(context) =>
          contextClass[context?.type || "default"] +
          " h-full relative flex py-1 px-3 mb-1 min-h-12 rounded-xl items-center justify-between border overflow-hidden cursor-pointer"
        }
        draggable
        bodyClassName={() =>
          "flex gap-1 items-center text-xs text-white line-clamp-2"
        }
      />
    </>
  );
}
