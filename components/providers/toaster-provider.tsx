"use client";

import { Toaster } from "sonner";

export function ToasterProvider() {
  return (
    <Toaster
      richColors
      position="top-right"
      toastOptions={{
        style: {
          background: "#fffdf9",
          color: "#143528",
          border: "1px solid #ddd1bb",
        },
      }}
    />
  );
}
