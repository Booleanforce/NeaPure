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
  try {
    const data = await apiClient.post<LoginResponse>(
      "/api/auth/login/",
      {
        email: email.trim(),
        password,
      }
    );

    /* -------------------------------------------------------
       Validate response
    ------------------------------------------------------- */

    if (!data) {
      throw new Error(
        "No response received from the server."
      );
    }

    if (!data.access) {
      throw new Error(
        "Login succeeded but no access token was returned."
      );
    }

    if (!data.refresh) {
      throw new Error(
        "Login succeeded but no refresh token was returned."
      );
    }

    if (!data.user) {
      throw new Error(
        "Login succeeded but no user information was returned."
      );
    }

    /* -------------------------------------------------------
       Save authentication data
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
  } catch (error: unknown) {
    console.error(
      "Login API error:",
      error
    );

    /* -------------------------------------------------------
       Handle Error object
    ------------------------------------------------------- */

    if (error instanceof Error) {
      throw error;
    }

    /* -------------------------------------------------------
       Handle API error objects
    ------------------------------------------------------- */

    if (
      typeof error === "object" &&
      error !== null
    ) {
      const apiError =
        error as {
          message?: string;
          detail?: string;
          error?: string;
          data?: unknown;
        };

      if (apiError.message) {
        throw new Error(
          apiError.message
        );
      }

      if (apiError.detail) {
        throw new Error(
          apiError.detail
        );
      }

      if (apiError.error) {
        throw new Error(
          apiError.error
        );
      }
    }

    throw new Error(
      "Unable to sign in. Please try again."
    );
  }
}

/* =========================================================
   ACCESS TOKEN
========================================================= */

export function getAccessToken(): string | null {
  if (
    typeof window === "undefined"
  ) {
    return null;
  }

  return localStorage.getItem(
    "access"
  );
}

/* =========================================================
   REFRESH TOKEN
========================================================= */

export function getRefreshToken(): string | null {
  if (
    typeof window === "undefined"
  ) {
    return null;
  }

  return localStorage.getItem(
    "refresh"
  );
}

/* =========================================================
   CURRENT USER
========================================================= */

export function getCurrentUser(): LoginUser | null {
  if (
    typeof window === "undefined"
  ) {
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
  } catch (error) {
    console.error(
      "Failed to parse stored user:",
      error
    );

    return null;
  }
}

/* =========================================================
   IS AUTHENTICATED
========================================================= */

export function isAuthenticated(): boolean {
  return Boolean(
    getAccessToken()
  );
}

/* =========================================================
   LOGOUT
========================================================= */

export function logout(): void {
  if (
    typeof window === "undefined"
  ) {
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