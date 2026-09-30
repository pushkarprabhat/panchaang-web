"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function AuthBar() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return (
      <a href="/account" className="muted" style={{ fontSize: "0.85rem" }}>
        Account
      </a>
    );
  }
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <button type="button" className="lang-btn">
            Sign in
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
