"use client";

import { SessionProvider } from "next-auth/react";

interface SessionProviderWrapperProps {
  children: React.ReactNode;
  session?: any; // Replace `any` with the correct type from `next-auth` if available
}

export function SessionProviderWrapper({ children, session }: SessionProviderWrapperProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
