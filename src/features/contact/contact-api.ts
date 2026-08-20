export type ContactQueryPayload = {
  email: string;
  subject: string;
  problem: string;
  website?: string;
};

type ApiEnvelope<T> = {
  ok: boolean;
  data?: T;
  error?: string;
};

const CONTACT_API_BASE =
  process.env.NEXT_PUBLIC_CONTACT_API_BASE_URL?.replace(/\/$/, "") ??
  process.env.NEXT_PUBLIC_BOOKING_API_BASE_URL?.replace(/\/$/, "") ??
  "http://localhost:8000";

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${CONTACT_API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  const payload = (await response.json()) as ApiEnvelope<T>;

  if (!response.ok || !payload.ok || !payload.data) {
    throw new Error(payload.error ?? "Request failed.");
  }

  return payload.data;
}

export async function getContactCsrfToken(): Promise<{ csrf_token: string }> {
  return apiRequest<{ csrf_token: string }>("/api/contact/csrf", {
    method: "GET",
  });
}

export async function submitContactQuery(
  payload: ContactQueryPayload,
  csrfToken: string,
): Promise<{ reference_id: string }> {
  return apiRequest<{ reference_id: string }>("/api/contact/query", {
    method: "POST",
    headers: {
      "X-CSRF-Token": csrfToken,
    },
    body: JSON.stringify(payload),
  });
}
