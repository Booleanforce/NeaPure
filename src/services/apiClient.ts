/* eslint-disable @typescript-eslint/no-explicit-any */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

/* =========================================================
   API ERROR
========================================================= */

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(
    status: number,
    data: any
  ) {
    let message =
      data?.detail ||
      data?.error ||
      data?.message;

    /*
     * Django REST Framework validation errors
     *
     * Example:
     *
     * {
     *   "email": ["Invalid email."]
     * }
     */

    if (
      !message &&
      data &&
      typeof data === "object"
    ) {
      const firstKey =
        Object.keys(data)[0];

      if (firstKey) {
        const value =
          data[firstKey];

        if (Array.isArray(value)) {
          message = value.join(", ");
        } else if (
          typeof value === "string"
        ) {
          message = value;
        } else if (
          value &&
          typeof value === "object"
        ) {
          message = JSON.stringify(value);
        }
      }
    }

    super(
      message ||
        `Request failed with status ${status}.`
    );

    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/* =========================================================
   REQUEST
========================================================= */

async function request<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url =
    `${API_BASE_URL}${endpoint}`;

  const headers = new Headers(
    options.headers || {}
  );

  /* =======================================================
     CONTENT TYPE
  ======================================================= */

  /*
   * IMPORTANT:
   *
   * Never manually set Content-Type when
   * sending FormData.
   *
   * Browser automatically creates:
   *
   * multipart/form-data;
   * boundary=...
   */

  if (
    !(options.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set(
      "Content-Type",
      "application/json"
    );
  }

  /* =======================================================
     AUTH
  ======================================================= */

  if (
    typeof window !== "undefined"
  ) {
    const token =
      localStorage.getItem(
        "access"
      );

    if (token) {
      headers.set(
        "Authorization",
        `Bearer ${token}`
      );
    }
  }

  /* =======================================================
     TIMEOUT
  ======================================================= */

  const controller =
    new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 30000);

  try {
    const response =
      await fetch(url, {
        ...options,
        headers,
        signal:
          controller.signal,
      });

    clearTimeout(timeout);

    /* =====================================================
       401
    ===================================================== */

    if (
      response.status === 401
    ) {
      if (
        typeof window !==
        "undefined"
      ) {
        localStorage.removeItem(
          "access"
        );

        localStorage.removeItem(
          "refresh"
        );

        localStorage.removeItem(
          "user"
        );

        if (
          window.location.pathname !==
          "/login"
        ) {
          window.location.href =
            "/login";
        }
      }

      throw new ApiError(
        401,
        {
          message:
            "Unauthorized",
        }
      );
    }

    /* =====================================================
       403
    ===================================================== */

    if (
      response.status === 403
    ) {
      throw new ApiError(
        403,
        {
          message:
            "Permission denied",
        }
      );
    }

    /* =====================================================
       204
    ===================================================== */

    if (
      response.status === 204
    ) {
      return {} as T;
    }

    /* =====================================================
       READ RESPONSE
    ===================================================== */

    const contentType =
      response.headers.get(
        "content-type"
      ) || "";

    const responseText =
      await response.text();

    let data: any = {};

    if (responseText) {
      try {
        data =
          JSON.parse(
            responseText
          );
      } catch {
        /*
         * Backend returned HTML/text
         * instead of JSON.
         */

        data = {
          message:
            responseText,
        };
      }
    }

    /* =====================================================
       HTTP ERROR
    ===================================================== */

    if (!response.ok) {
      console.error(
        "API ERROR",
        {
          url,
          status:
            response.status,
          contentType,
          response: data,
        }
      );

      throw new ApiError(
        response.status,
        data
      );
    }

    /* =====================================================
       EMPTY RESPONSE
    ===================================================== */

    if (!responseText) {
      return {} as T;
    }

    /* =====================================================
       WRAPPED RESPONSE
    ===================================================== */

    if (
      data &&
      typeof data === "object" &&
      "success" in data &&
      "data" in data
    ) {
      return data.data as T;
    }

    /* =====================================================
       NORMAL RESPONSE
    ===================================================== */

    return data as T;
  } catch (error: any) {
    clearTimeout(timeout);

    if (
      error?.name ===
      "AbortError"
    ) {
      throw new ApiError(
        408,
        {
          message:
            "Request timeout.",
        }
      );
    }

    throw error;
  }
}

/* =========================================================
   API CLIENT
========================================================= */

export const apiClient = {
  /* =======================================================
     GET
  ======================================================= */

  get: <T = unknown>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> =>
    request<T>(
      endpoint,
      {
        ...options,
        method: "GET",
      }
    ),

  /* =======================================================
     POST
  ======================================================= */

  post: <T = unknown>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<T> =>
    request<T>(
      endpoint,
      {
        ...options,
        method: "POST",
        body:
          data instanceof FormData
            ? data
            : data !== undefined
              ? JSON.stringify(data)
              : undefined,
      }
    ),

  /* =======================================================
     PUT
  ======================================================= */

  put: <T = unknown>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<T> =>
    request<T>(
      endpoint,
      {
        ...options,
        method: "PUT",
        body:
          data instanceof FormData
            ? data
            : data !== undefined
              ? JSON.stringify(data)
              : undefined,
      }
    ),

  /* =======================================================
     PATCH
  ======================================================= */

  patch: <T = unknown>(
    endpoint: string,
    data?: any,
    options?: RequestInit
  ): Promise<T> =>
    request<T>(
      endpoint,
      {
        ...options,
        method: "PATCH",
        body:
          data instanceof FormData
            ? data
            : data !== undefined
              ? JSON.stringify(data)
              : undefined,
      }
    ),

  /* =======================================================
     DELETE
  ======================================================= */

  delete: <T = unknown>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> =>
    request<T>(
      endpoint,
      {
        ...options,
        method: "DELETE",
      }
    ),
};