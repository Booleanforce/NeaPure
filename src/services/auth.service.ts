const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(
  email: string,
  password: string
) {
  const response = await fetch(
    `${API_URL}/api/auth/login/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Login failed"
    );
  }

  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);
  localStorage.setItem(
    "user",
    JSON.stringify(data.user)
  );

  return data;
}

export async function logout() {
  const refresh = localStorage.getItem("refresh");

  try {
    if (refresh) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
          body: JSON.stringify({
            refresh,
          }),
        }
      );
    }
  } catch (error) {
    console.log(error);
  }

  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
}