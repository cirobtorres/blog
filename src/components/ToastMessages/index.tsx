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

const contextClass = {
  success: "text-white border-[#2b813e] bg-dark-base-green",
  error: "text-white border-dark-base-red bg-[#803d3d]",
  info: "text-white border-dark-base-blue bg-[#274c5c]",
  warning: "text-white border-dark-base-yellow bg-[#9e7d29]",
  default:
    "text-base-neutral dark:text-dark-base-neutral border-base-border bg-base-100 dark:border-dark-base-border dark:bg-dark-base-100",
};

export const defaultToastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 8000,
  closeOnClick: false,
  closeButton: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  hideProgressBar: false,
  pauseOnFocusLoss: true,
  transition: Bounce,
  draggablePercent: 20,
  className: (context) =>
    contextClass[context?.type || "default"] +
    " Toastify__toast relative flex py-1 px-3 mb-1 z-50 rounded-xl items-center justify-between border overflow-hidden pointer-events-auto cursor-pointer",
  bodyClassName: () => "text-xs flex items-center [&_p]:line-clamp-2",
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
    default:
      return toast(content, optionsToApply);
  }
};

export default function ToastMessagesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
