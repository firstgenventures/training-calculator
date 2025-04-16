"use client";
import React from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{ padding: 32, maxWidth: 600, margin: "0 auto", color: "#b00020" }}>
      <h2>Something went wrong</h2>
      <p>{error?.message || "An unexpected error occurred while rendering this page."}</p>
      <button onClick={() => reset()} style={{ marginTop: 16, padding: "8px 16px" }}>
        Try again
      </button>
    </div>
  );
}
