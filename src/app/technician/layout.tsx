import Link from "next/link";
import { Wrench, CheckCircle, Home, User } from "lucide-react";

export default function TechnicianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-[#0a0a0a]">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center justify-center border-b border-gray-200 bg-white px-4 dark:bg-[#0a0a0a] dark:border-gray-800">
        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Technician App
        </span>
      </header>

      {/* Main content scrollable area */}
      <main className="flex-1 overflow-y-auto p-4 pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center dark:bg-[#0a0a0a] dark:border-gray-800 safe-area-bottom">
        <Link href="/technician" className="flex flex-col items-center gap-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
          <Home className="h-5 w-5" />
          <span className="text-xs font-medium">Home</span>
        </Link>
        <Link href="/technician/installations" className="flex flex-col items-center gap-1 text-blue-600 dark:text-blue-400">
          <Wrench className="h-5 w-5" />
          <span className="text-xs font-medium">Jobs</span>
        </Link>
        <Link href="/technician/completed" className="flex flex-col items-center gap-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
          <CheckCircle className="h-5 w-5" />
          <span className="text-xs font-medium">History</span>
        </Link>
        <Link href="/technician/profile" className="flex flex-col items-center gap-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
          <User className="h-5 w-5" />
          <span className="text-xs font-medium">Profile</span>
        </Link>
      </nav>
    </div>
  );
}