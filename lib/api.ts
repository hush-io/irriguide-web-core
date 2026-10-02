// The browser goes through the `/api` rewrite in next.config.ts, the server calls the backend directly.
const backendUrl = process.env.IRRIGUIDE_API_URL ?? "http://localhost:8000";
function apiUrl(path: string) {
  return typeof window === "undefined" ? `${backendUrl}${path}` : path;
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(apiUrl(path), init);
  if (!response.ok) {
    throw new Error(
      `${init?.method ?? "GET"} ${path} failed with ${response.status}`,
    );
  }

  return response.json();
}
