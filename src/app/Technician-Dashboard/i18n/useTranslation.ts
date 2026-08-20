"use client";

import {
  translations,
  type Language,
} from "./translations";

import {
  useTechnician,
} from "../context/TechnicianContext";

export function useTranslation() {
  const { language } =
    useTechnician();

  function t<
    Section extends keyof typeof translations,
    Key extends keyof typeof translations[Section]
  >(
    section: Section,
    key: Key
  ): string {
    const value =
      translations[section][key];

    return value[
      language as keyof typeof value
    ] as string;
  }

  return {
    language,
    t,
  };
}