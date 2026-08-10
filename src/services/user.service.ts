import { getAccessToken } from "./auth.service";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCurrentUser() {
  const token = getAccessToken();

  const response = await fetch(
    `${API_URL}/api/auth/me/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  return await response.json();
}