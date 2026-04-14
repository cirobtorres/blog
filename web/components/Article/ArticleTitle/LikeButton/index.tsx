"use client";

import React from "react";

const initialState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export default function LikeButton({ size = 20 }: { size?: number }) {
  const [, action, isPending] = React.useActionState(async () => {
    // TODO
    return initialState;
  }, initialState);

  return (
    <form action={action}>
      <button
        type="submit"
        disabled={isPending}
        className="cursor-pointer flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
        </svg>
      </button>
    </form>
  );
}
