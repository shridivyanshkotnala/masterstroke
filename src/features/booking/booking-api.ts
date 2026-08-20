import type {
  AvailabilityResponse,
  BookingPayload,
  BookingProfile,
  BookingSettings,
  BookingSuccess,
} from "@/features/booking/types";

const API_BASE =
  process.env.NEXT_PUBLIC_BOOKING_API_BASE_URL?.replace(/\/$/, "") ??
  "http://localhost:8080";

type ApiResponse<T> = {
  ok: boolean;
  data?: T;
  error?: string;
};

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !payload.ok || !payload.data) {
    throw new Error(payload.error ?? "Request failed.");
  }

  return payload.data;
}

export async function getGoogleAuthUrl(): Promise<string> {
  const data = await apiRequest<{ auth_url: string }>("/auth/google", {
    method: "GET",
  });

  return data.auth_url;
}

export async function getProfile(): Promise<BookingProfile> {
  return apiRequest<BookingProfile>("/api/profile", { method: "GET" });
}

export async function logoutProfile(): Promise<void> {
  await apiRequest<Record<string, never>>("/auth/logout", { method: "POST" });
}

export async function getTimezones(): Promise<string[]> {
  const data = await apiRequest<{ timezones: string[] }>("/api/timezones", {
    method: "GET",
  });

  return data.timezones;
}

export async function getSettings(): Promise<BookingSettings> {
  return apiRequest<BookingSettings>("/api/settings", { method: "GET" });
}

export async function getAvailability(
  date: string,
  timezone: string,
): Promise<AvailabilityResponse> {
  return apiRequest<AvailabilityResponse>("/api/calendar/availability", {
    method: "POST",
    body: JSON.stringify({ date, timezone }),
  });
}

export async function createBooking(
  payload: BookingPayload,
  csrfToken: string,
): Promise<BookingSuccess> {
  return apiRequest<BookingSuccess>("/api/book", {
    method: "POST",
    headers: {
      "X-CSRF-Token": csrfToken,
    },
    body: JSON.stringify(payload),
  });
}
