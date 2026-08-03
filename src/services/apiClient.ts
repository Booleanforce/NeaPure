/* eslint-disable @typescript-eslint/no-explicit-any */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, data: any) {
    super(
      data?.detail ||
        data?.error ||
        data?.message ||
        "Something went wrong."
    );

    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers = new Headers(options.headers || {});

  if (
    !headers.has("Content-Type") &&
    !(options.body instanceof FormData)
  ) {
    headers.set("Content-Type", "application/json");
  }

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 30000);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }

      throw new ApiError(401, {
        message: "Unauthorized",
      });
    }

    if (response.status === 403) {
      throw new ApiError(403, {
        message: "Permission denied",
      });
    }

    if (!response.ok) {
      let errorData: any = {};

      try {
        errorData = await response.json();
      } catch {
        errorData = {
          message: response.statusText,
        };
      }

      throw new ApiError(response.status, errorData);
    }

    if (response.status === 204) {
      return {} as T;
    }

    const contentType = response.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
      return {} as T;
    }

    const data = await response.json();

    if (
      data &&
      typeof data === "object" &&
      "success" in data &&
      "data" in data
    ) {
      return data.data as T;
    }

    return data as T;
  } catch (error: any) {
    clearTimeout(timeout);

    if (error.name === "AbortError") {
      throw new ApiError(408, {
        message: "Request timeout.",
      });
    }

    throw error;
  }
}

export const apiClient = {
  get: <T>(
    endpoint: string,
    options?: RequestInit
  ) =>
    request<T>(endpoint, {
      ...options,
      method: "GET",
    }),

  post: <T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body:
        data instanceof FormData
          ? data
          : JSON.stringify(data),
    }),

  put: <T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body:
        data instanceof FormData
          ? data
          : JSON.stringify(data),
    }),

  patch: <T>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ) =>
    request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body:
        data instanceof FormData
          ? data
          : JSON.stringify(data),
    }),

  delete: <T>(
    endpoint: string,
    options?: RequestInit
  ) =>
    request<T>(endpoint, {
      ...options,
      method: "DELETE",
    }),
};