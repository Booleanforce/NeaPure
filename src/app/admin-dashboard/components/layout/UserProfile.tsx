/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  photo?: string;
}

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid user data:", error);
      }
    }
  }, []);

  const initials =
    user?.full_name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "NA";

  const role =
    user?.role
      ?.replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()) ||
    "Guest";

  return (
    <div className="border-t border-gray-100 p-3">
      <div className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition hover:bg-gray-50">
        {user?.photo ? (
          <img
            src={user.photo}
            alt={user.full_name}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-bold text-white">
            {initials}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-gray-900">
            {user?.full_name || "Guest User"}
          </p>

          <p className="truncate text-xs text-gray-500">
            {role}
          </p>
        </div>

        <ChevronDown className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
}