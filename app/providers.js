"use client";

import { ClerkProvider } from "@clerk/nextjs";

export default function Providers({ children }) {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!key) return children;
  return <ClerkProvider publishableKey={key}>{children}</ClerkProvider>;
}
