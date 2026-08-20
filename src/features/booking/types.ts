export type BookingProfile = {
  id: number;
  full_name: string;
  email: string;
  avatar_url: string;
  verified_email: boolean;
  csrf_token: string;
};

export type BookingSettings = {
  meeting_duration_minutes: number;
  slot_interval_minutes: number;
  allow_weekends: boolean;
  buffer_minutes: number;
  booking_advance_days: number;
  timezone_default: string;
};

export type AvailabilitySlot = {
  start_local: string;
  end_local: string;
  start_utc: string;
  end_utc: string;
  label: string;
  available: boolean;
};

export type AvailabilityResponse = {
  slots: AvailabilitySlot[];
  meta: {
    meeting_duration_minutes: number;
    slot_interval_minutes: number;
    reason?: string;
  };
};

export type BookingPayload = {
  phone: string;
  country?: string;
  countryCode?: string;
  phoneLocal?: string;
  fullPhone?: string;
  company_name: string;
  project_description?: string;
  timezone: string;
  date: string;
  slot_start_utc: string;
};

export type BookingSuccess = {
  booking_id: number;
  meet_link: string;
  calendar_event_id: string;
  calendar_event_link: string;
};
