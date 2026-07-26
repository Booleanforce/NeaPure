"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isHiddenLayoutRoute =
    pathname.startsWith("/admin") || pathname === "/login";

  if (isHiddenLayoutRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer/>
    </>
  );
}