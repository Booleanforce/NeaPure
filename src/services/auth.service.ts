import { apiClient } from "./apiClient";

export interface LoginUser {
  id: string;
  email: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  [key: string]: unknown;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: LoginUser;
}

/* -------------------------------------------------------------------------- */
/*                                   Login                                    */
/* -------------------------------------------------------------------------- */

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const data = await apiClient.post<LoginResponse>(
    "/api/auth/login/",
    {
      email,
      password,
    }
  );

  if (!data?.access) {
    throw new Error(
      "Login succeeded but no access token was returned."
    );
  }

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

/* -------------------------------------------------------------------------- */
/*                              Access Token                                  */
/* -------------------------------------------------------------------------- */

export function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("access");
}

/* -------------------------------------------------------------------------- */
/*                              Refresh Token                                 */
/* -------------------------------------------------------------------------- */

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("refresh");
}

/* -------------------------------------------------------------------------- */
/*                              Current User                                  */
/* -------------------------------------------------------------------------- */

export function getCurrentUser(): LoginUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user) as LoginUser;
  } catch {
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*                                  Logout                                    */
/* -------------------------------------------------------------------------- */

export function logout(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");

  window.location.href = "/login";
}