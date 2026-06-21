// app/page.tsx
import React from "react";

// Default export is required for Next.js pages
export default function HomePage() {
  return (
    <main
      style={{
        fontFamily: "sans-serif",
        padding: "2rem",
        textAlign: "center",
      }}
      className="mt-20"
    >
      <h1>Welcome to My Next.js App 🚀</h1>
      <p>This is the default home page.</p>
    </main>
  );
}
