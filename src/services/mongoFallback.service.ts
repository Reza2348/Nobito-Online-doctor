const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

export class MongoRequestError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "MongoRequestError";
    this.status = status;
    this.data = data;
  }
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function mongoRequest<T = unknown>(
  method: HttpMethod,
  path: string,
  body?: unknown,
): Promise<T> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_BASE_URL}${normalizedPath}`;

  let response: Response;

  try {
    response = await fetch(url, {
      method,
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
      cache: "no-store",
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "خطای ناشناخته";

    throw new Error(`اتصال به API برقرار نشد: ${url}. علت: ${reason}`);
  }

  const contentType = response.headers.get("content-type") || "";
  let data: unknown;

  try {
    data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();
  } catch {
    throw new MongoRequestError(
      `پاسخ سرور قابل خواندن نیست. HTTP ${response.status}`,
      response.status,
    );
  }

  if (!response.ok) {
    let message = `درخواست ناموفق بود. HTTP ${response.status}`;

    if (
      data !== null &&
      typeof data === "object" &&
      "message" in data &&
      typeof data.message === "string"
    ) {
      message = data.message;
    }

    throw new MongoRequestError(message, response.status, data);
  }

  return data as T;
}
