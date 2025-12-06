"use client";

import { LoginHeader } from "@/app/components/login";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LoginHeader />
      {children}
    </>
  );
}
