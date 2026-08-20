/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type AdminLanguage =
  | "English"
  | "Bangla";

interface AdminContextValue {
  language: AdminLanguage;

  setLanguage: (
    language: AdminLanguage
  ) => void;
}

const AdminContext =
  createContext<AdminContextValue | null>(
    null
  );

const STORAGE_KEY =
  "admin_language";

export function AdminProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguageState] =
    useState<AdminLanguage>("English");

  useEffect(() => {
    const saved =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (saved === "Bangla") {
      setLanguageState("Bangla");
    } else {
      setLanguageState("English");
    }
  }, []);

  const setLanguage = useCallback(
    (nextLanguage: AdminLanguage) => {
      setLanguageState(nextLanguage);

      localStorage.setItem(
        STORAGE_KEY,
        nextLanguage
      );
    },
    []
  );

  return (
    <AdminContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context =
    useContext(AdminContext);

  if (!context) {
    throw new Error(
      "useAdmin must be used inside AdminProvider"
    );
  }

  return context;
}