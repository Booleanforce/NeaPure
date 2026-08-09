import { apiClient } from "./apiClient";

/* =========================================================
   LOGIN USER
========================================================= */

export interface LoginUser {
  id: string;

  email: string;

  name?: string;

  first_name?: string;

  last_name?: string;

  role?: string;

  [key: string]: unknown;
}

/* =========================================================
   LOGIN RESPONSE
========================================================= */

export interface LoginResponse {
  access: string;

  refresh: string;

  user: LoginUser;
}

/* =========================================================
   LOGIN
========================================================= */

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const data =
    await apiClient.post<LoginResponse>(
      "/api/auth/login/",
      {
        email,
        password,
      }
    );

  /* -------------------------------------------------------
     Validate access token
  ------------------------------------------------------- */

  if (!data?.access) {
    throw new Error(
      "Login succeeded but no access token was returned."
    );
  }

  /* -------------------------------------------------------
     Validate user
  ------------------------------------------------------- */

  if (!data?.user) {
    throw new Error(
      "Login succeeded but no user information was returned."
    );
  }

  /* -------------------------------------------------------
     Store authentication data
  ------------------------------------------------------- */

  if (typeof window !== "undefined") {
    localStorage.setItem(
      "access",
      data.access
    );

    localStorage.setItem(
      "refresh",
      data.refresh
    );

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );
  }

  return data;
}

/* =========================================================
   ACCESS TOKEN
========================================================= */

export function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("access");
}

/* =========================================================
   REFRESH TOKEN
========================================================= */

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("refresh");
}

/* =========================================================
   CURRENT USER
========================================================= */

export function getCurrentUser(): LoginUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const user =
    localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(
      user
    ) as LoginUser;
  } catch {
    return null;
  }
}

/* =========================================================
   LOGOUT
========================================================= */

export function logout(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(
    "access"
  );

  localStorage.removeItem(
    "refresh"
  );

  localStorage.removeItem(
    "user"
  );

  window.location.href =
    "/login";
}