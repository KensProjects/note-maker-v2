"use client"

import { useSession } from "next-auth/react";
import AppShell from "~/app/_components/appShell/AppShell";

export default function Home() {
  const { status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  } else if (status === "unauthenticated") {
    return <div>Not logged in</div>
  } else
    return (
      <AppShell />
    );
}