import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/60 dark:bg-black/60  z-50">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.7s]" />
        <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.3s]" />
        <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.7s]" />
      </div>
    </div>
  );
}
