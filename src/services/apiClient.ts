"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

/* ============================================================================
   PUBLIC ENDPOINTS

   Public access is METHOD-SPECIFIC.

   GET products/categories can be public,
   but POST/PATCH/DELETE operations are protected.
============================================================================ */

const PUBLIC_GET_ENDPOINTS = [
  "/api/products/products/",
  "/api/products/categories/",
];

const PUBLIC_POST_ENDPOINTS = [
  "/api/auth/login/",
  "/api/ai/chat/",
];

/* ============================================================================
   CHECK PUBLIC ENDPOINT
============================================================================ */

function isPublicEndpoint(
  endpoint: string,
  method: string
): boolean {
  const normalizedMethod =
    method.toUpperCase();

  /* ------------------------------------------------------------------------
     PUBLIC GET
  ------------------------------------------------------------------------ */

  if (normalizedMethod === "GET") {
    return PUBLIC_GET_ENDPOINTS.some(
      (publicEndpoint) =>
        endpoint === publicEndpoint ||
        endpoint.startsWith(
          publicEndpoint
        )
    );
  }

  /* ------------------------------------------------------------------------
     PUBLIC POST
  ------------------------------------------------------------------------ */

  if (normalizedMethod === "POST") {
    return PUBLIC_POST_ENDPOINTS.some(
      (publicEndpoint) =>
        endpoint === publicEndpoint
    );
  }

  return false;
}

/* ============================================================================
   API ERROR
============================================================================ */

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

    /* ----------------------------------------------------------------------
       Django REST Framework validation errors
    ---------------------------------------------------------------------- */

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
          message =
            value.join(", ");
        } else if (
          typeof value === "string"
        ) {
          message = value;
        } else if (
          value &&
          typeof value === "object"
        ) {
          message =
            JSON.stringify(value);
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

/* ============================================================================
   CLEAR AUTH DATA
============================================================================ */

function clearAuthData(): void {
  if (
    typeof window ===
    "undefined"
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
}

/* ============================================================================
   REDIRECT TO LOGIN
============================================================================ */

function redirectToLogin(): void {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  /* ------------------------------------------------------------------------
     Prevent redirect loop
  ------------------------------------------------------------------------ */

  if (
    window.location.pathname ===
    "/login"
  ) {
    return;
  }

  window.location.href =
    "/login";
}

/* ============================================================================
   REQUEST
============================================================================ */

async function request<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  /* ==========================================================================
     URL
  ========================================================================== */

  const normalizedBaseUrl =
    API_BASE_URL.replace(
      /\/$/,
      ""
    );

  const normalizedEndpoint =
    endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;

  const url =
    `${normalizedBaseUrl}${normalizedEndpoint}`;

  /* ==========================================================================
     METHOD
  ========================================================================== */

  const method =
    (
      options.method ||
      "GET"
    ).toUpperCase();

  /* ==========================================================================
     HEADERS
  ========================================================================== */

  const headers = new Headers(
    options.headers || {}
  );

  /* ==========================================================================
     CONTENT TYPE
  ========================================================================== */

  /*
   * Never manually set Content-Type for FormData.
   *
   * The browser automatically sets:
   *
   * multipart/form-data; boundary=...
   */

  if (
    !(options.body instanceof FormData) &&
    !headers.has(
      "Content-Type"
    )
  ) {
    headers.set(
      "Content-Type",
      "application/json"
    );
  }

  /* ==========================================================================
     AUTHENTICATION
  ========================================================================== */

  let token: string | null =
    null;

  if (
    typeof window !==
    "undefined"
  ) {
    token =
      localStorage.getItem(
        "access"
      );
  }

  const publicEndpoint =
    isPublicEndpoint(
      endpoint,
      method
    );

  /*
   * IMPORTANT:
   *
   * Only skip Authorization for genuinely
   * public METHOD + ENDPOINT combinations.
   *
   * Therefore:
   *
   * GET  /api/products/products/    -> public
   * POST /api/products/products/   -> protected
   * PATCH /api/products/products/  -> protected
   * DELETE /api/products/products/ -> protected
   */

  if (
    token &&
    !publicEndpoint
  ) {
    headers.set(
      "Authorization",
      `Bearer ${token}`
    );
  }

  /* ==========================================================================
     DEBUG AUTH
  ========================================================================== */

  if (
    typeof window !==
      "undefined" &&
    process.env.NODE_ENV ===
      "development"
  ) {
    console.log(
      "[API REQUEST]",
      {
        method,
        endpoint,
        publicEndpoint,
        hasToken: Boolean(token),
      }
    );
  }

  /* ==========================================================================
     TIMEOUT
  ========================================================================== */

  const controller =
    new AbortController();

  const timeout = setTimeout(
    () => {
      controller.abort();
    },
    30000
  );

  try {
    /* ========================================================================
       FETCH
    ======================================================================== */

    const response =
      await fetch(url, {
        ...options,
        method,
        headers,
        signal:
          controller.signal,
      });

    clearTimeout(timeout);

    /* ========================================================================
       401 UNAUTHORIZED
    ======================================================================== */

    if (
      response.status === 401
    ) {
      if (!publicEndpoint) {
        clearAuthData();
        redirectToLogin();
      }

      throw new ApiError(
        401,
        {
          message:
            publicEndpoint
              ? "Unauthorized response from public endpoint."
              : "Unauthorized. Please log in again.",
        }
      );
    }

    /* ========================================================================
       403 FORBIDDEN
    ======================================================================== */

    if (
      response.status === 403
    ) {
      throw new ApiError(
        403,
        {
          message:
            "Permission denied. You do not have permission to perform this action.",
        }
      );
    }

    /* ========================================================================
       204 NO CONTENT
    ======================================================================== */

    if (
      response.status === 204
    ) {
      return {} as T;
    }

    /* ========================================================================
       RESPONSE CONTENT TYPE
    ======================================================================== */

    const contentType =
      response.headers.get(
        "content-type"
      ) || "";

    /* ========================================================================
       READ RESPONSE
    ======================================================================== */

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
         * Backend returned plain text
         * or HTML instead of JSON.
         */

        data = {
          message:
            responseText,
        };
      }
    }

    /* ========================================================================
       HTTP ERROR
    ======================================================================== */

    if (!response.ok) {
      console.error(
        "API ERROR",
        {
          url,
          method,
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

    /* ========================================================================
       EMPTY RESPONSE
    ======================================================================== */

    if (!responseText) {
      return {} as T;
    }

    /* ========================================================================
       WRAPPED API RESPONSE
    ======================================================================== */

    /*
     * Your Django API may return:
     *
     * {
     *   success: true,
     *   data: {...},
     *   message: "..."
     * }
     */

    if (
      data &&
      typeof data === "object" &&
      "success" in data &&
      "data" in data
    ) {
      return data.data as T;
    }

    /* ========================================================================
       NORMAL RESPONSE
    ======================================================================== */

    return data as T;
  } catch (error: any) {
    clearTimeout(timeout);

    /* ========================================================================
       TIMEOUT
    ======================================================================== */

    if (
      error?.name ===
      "AbortError"
    ) {
      throw new ApiError(
        408,
        {
          message:
            "Request timeout. Please try again.",
        }
      );
    }

    /* ========================================================================
       API ERROR
    ======================================================================== */

    if (
      error instanceof ApiError
    ) {
      throw error;
    }

    /* ========================================================================
       NETWORK ERROR
    ======================================================================== */

    console.error(
      "Network/API request failed:",
      error
    );

    throw new ApiError(
      0,
      {
        message:
          error?.message ||
          "Unable to connect to the server.",
      }
    );
  }
}

/* ============================================================================
   API CLIENT
============================================================================ */

export const apiClient = {
  /* ==========================================================================
     GET
  ========================================================================== */

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

  /* ==========================================================================
     POST
  ========================================================================== */

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

  /* ==========================================================================
     PUT
  ========================================================================== */

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

  /* ==========================================================================
     PATCH
  ========================================================================== */

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

  /* ==========================================================================
     DELETE
  ========================================================================== */

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