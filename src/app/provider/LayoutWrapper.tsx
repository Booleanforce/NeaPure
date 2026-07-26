"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar/Navbar";


export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // If it is /admin or /login, only render the children (no nav, footer, or bottom bar)
  const isHiddenLayoutRoute =
    pathname?.startsWith("/admin") || pathname === "/login";

  if (isHiddenLayoutRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      
    </>
  );
}
