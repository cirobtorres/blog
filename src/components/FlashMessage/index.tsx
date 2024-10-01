"use client";

import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import useFlashMessage from "@/hooks/useFlashMessage";

export default function FlashMessage() {
  const { show, setShow, type, label } = useFlashMessage();

  useEffect(() => {
    if (show) return;
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, [show, setShow]);

  const color = (type: string) => {
    switch (type) {
      case "success":
        return "focus:outline-dark-base-green border-dark-base-green bg-[#2c5e4b]";
      case "warning":
        return "focus:outline-dark-base-yellow border-dark-base-yellow bg-[#9e7d29]";
      case "info":
        return "focus:outline-dark-base-blue border-dark-base-blue bg-[#274c5c]";
      default:
        return "focus:outline-dark-base-red border-dark-base-red bg-[#803d3d]";
    }
  };

  return (
    <div
      className={`
        z-[6] absolute transition-transform duration-1000 -top-14 ${
          show ? "translate-y-14 opacity-100" : "translate-y-0"
        } left-0 right-0 flex items-center px-4 w-full h-14 border-y ${color(
        type
      )}`}
    >
      <div className="relative w-full">
        <p className="text-sm text-white">{label}</p>
        <button
          type="button"
          className={`absolute top-1/2 -translate-y-1/2 right-4 border-none p-0.5 rounded-lg outline-2 outline outline-transparent transition-[outline] duration-300 ${color(
            type
          )}`}
        >
          <IoClose className="text-xl text-white" />
        </button>
      </div>
    </div>
  );
}
