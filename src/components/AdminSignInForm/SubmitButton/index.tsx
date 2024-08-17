"use client";

import Loading from "@/components/Loading";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full h-12 flex justify-center items-center rounded text-[#ffffff] bg-emerald-500"
    >
      {pending ? (
        <Loading size={24} />
      ) : (
        <p className="text-xl font-extrabold text-emerald-100">Login</p>
      )}
    </button>
  );
}
