"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js";
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Globe2,
  Loader2,
  Search,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  countryCodeToFlag,
  countryPhoneOptions,
  type CountryPhone,
} from "@/features/booking/country-phone";
import {
  buildTimezoneOptions,
  defaultTimezoneFromOptions,
  type TimezoneOption,
} from "@/features/booking/timezone-options";
import {
  createBooking,
  getAvailability,
  getGoogleAuthUrl,
  getProfile,
  getSettings,
  getTimezones,
  logoutProfile,
} from "@/features/booking/booking-api";
import type {
  AvailabilityResponse,
  AvailabilitySlot,
  BookingProfile,
  BookingSettings,
  BookingSuccess,
} from "@/features/booking/types";
import { cn } from "@/lib/utils";

type StepKey =
  | "oauth"
  | "phone"
  | "company"
  | "date"
  | "slot"
  | "review"
  | "done";

const stepOrder: StepKey[] = [
  "oauth",
  "phone",
  "company",
  "date",
  "slot",
  "review",
  "done",
];

export function StrategyCallWizard() {
  const [currentStep, setCurrentStep] = useState<StepKey>("oauth");
  const [profile, setProfile] = useState<BookingProfile | null>(null);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [settings, setSettings] = useState<BookingSettings | null>(null);
  const [timezones, setTimezones] = useState<string[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<CountryPhone>(
    () => countryPhoneOptions.find((country) => country.iso2 === "US") ?? countryPhoneOptions[0],
  );
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [countryHighlightIndex, setCountryHighlightIndex] = useState(0);
  const [phoneInput, setPhoneInput] = useState("");
  const [phoneE164, setPhoneE164] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const [selectedTimezone, setSelectedTimezone] = useState("UTC");
  const [timezonePickerOpen, setTimezonePickerOpen] = useState(false);
  const [timezoneSearch, setTimezoneSearch] = useState("");
  const [timezoneHighlightIndex, setTimezoneHighlightIndex] = useState(0);
  const [timezoneScrollTop, setTimezoneScrollTop] = useState(0);

  const [monthDate, setMonthDate] = useState(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingResult, setBookingResult] = useState<BookingSuccess | null>(null);

  const [fullyBookedCache, setFullyBookedCache] = useState<Record<string, boolean>>({});
  const countryPickerRef = useRef<HTMLDivElement | null>(null);
  const timezonePickerRef = useRef<HTMLDivElement | null>(null);

  const currentStepIndex = stepOrder.indexOf(currentStep);
  const progress = Math.max(10, ((currentStepIndex + 1) / stepOrder.length) * 100);

  const timezoneOptions = useMemo(() => buildTimezoneOptions(timezones), [timezones]);

  const selectedTimezoneOption = useMemo(
    () => timezoneOptions.find((option) => option.value === selectedTimezone) ?? null,
    [selectedTimezone, timezoneOptions],
  );

  const filteredTimezoneOptions = useMemo(() => {
    const query = timezoneSearch.trim().toLowerCase();
    if (!query) {
      return timezoneOptions;
    }

    return timezoneOptions.filter((option) => option.searchText.includes(query));
  }, [timezoneOptions, timezoneSearch]);

  const timezoneRowHeight = 84;
  const timezoneListHeight = 420;
  const timezoneOverscan = 6;

  const timezoneWindow = useMemo(() => {
    const startIndex = Math.max(
      0,
      Math.floor(timezoneScrollTop / timezoneRowHeight) - timezoneOverscan,
    );
    const visibleCount = Math.ceil(timezoneListHeight / timezoneRowHeight) + timezoneOverscan * 2;
    const endIndex = Math.min(filteredTimezoneOptions.length, startIndex + visibleCount);

    return {
      startIndex,
      endIndex,
      items: filteredTimezoneOptions.slice(startIndex, endIndex),
    };
  }, [filteredTimezoneOptions, timezoneScrollTop]);

  const filteredCountryOptions = useMemo(() => {
    const query = countrySearch.trim().toLowerCase();
    if (!query) {
      return countryPhoneOptions;
    }

    return countryPhoneOptions.filter((country) => {
      return (
        country.name.toLowerCase().includes(query) ||
        country.dialCode.includes(query) ||
        country.iso2.toLowerCase().includes(query)
      );
    });
  }, [countrySearch]);

  const phoneIsValid = useMemo(() => {
    if (!phoneE164) {
      return false;
    }
    const parsed = parsePhoneNumberFromString(phoneE164);
    return parsed?.isValid() ?? false;
  }, [phoneE164]);

  const phoneValidationMessage = useMemo(() => {
    if (!phoneTouched || phoneInput.trim() === "") {
      return null;
    }

    return phoneIsValid ? null : "Please enter a valid phone number.";
  }, [phoneInput, phoneIsValid, phoneTouched]);

  const profileInitials = useMemo(() => {
    if (!profile?.full_name) {
      return "KC";
    }

    const parts = profile.full_name.trim().split(/\s+/).slice(0, 2);
    return parts.map((part) => part.charAt(0).toUpperCase()).join("");
  }, [profile?.full_name]);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    return eachDayOfInterval({ start: gridStart, end: gridEnd });
  }, [monthDate]);

  const earliestBookable = useMemo(() => startOfDay(new Date()), []);

  const lastBookable = useMemo(() => {
    const days = settings?.booking_advance_days ?? 90;
    return startOfDay(addDays(new Date(), days));
  }, [settings]);

  const loadAvailability = useCallback(
    async (date: Date) => {
      const dateIso = format(date, "yyyy-MM-dd");
      try {
        setAvailabilityLoading(true);
        setErrorMessage(null);
        const response = await getAvailability(dateIso, selectedTimezone);
        setAvailability(response);

        const hasAvailable = response.slots.some((slot) => slot.available);
        setFullyBookedCache((prev) => ({ ...prev, [dateIso]: !hasAvailable }));
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to load slots for this date.",
        );
        setAvailability(null);
      } finally {
        setAvailabilityLoading(false);
      }
    },
    [selectedTimezone],
  );

  useEffect(() => {
    const init = async () => {
      try {
        setProfileLoading(true);
        const [tzs, appSettings] = await Promise.all([
          getTimezones(),
          getSettings(),
        ]);

        setTimezones(tzs);
        setSettings(appSettings);

        const tzOptions = buildTimezoneOptions(tzs);
        const savedTimezone = typeof window !== "undefined"
          ? window.sessionStorage.getItem("booking.selectedTimezone")
          : null;

        if (savedTimezone && tzs.includes(savedTimezone)) {
          setSelectedTimezone(savedTimezone);
        } else {
          setSelectedTimezone(defaultTimezoneFromOptions(tzOptions));
        }

        try {
          const me = await getProfile();
          setProfile(me);
          const maybeTimezone = (me as BookingProfile & { timezone?: string }).timezone;
          if (typeof maybeTimezone === "string" && tzs.includes(maybeTimezone)) {
            setSelectedTimezone(maybeTimezone);
          }
          setCurrentStep("phone");
        } catch {
          setCurrentStep("oauth");
        }
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Initialization failed. Please refresh and retry.",
        );
      } finally {
        setProfileLoading(false);
      }
    };

    void init();
  }, []);

  useEffect(() => {
    if (!selectedTimezone) {
      return;
    }

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("booking.selectedTimezone", selectedTimezone);
    }
  }, [selectedTimezone]);

  useEffect(() => {
    if (selectedDate) {
      void loadAvailability(selectedDate);
    }
  }, [selectedDate, selectedTimezone, loadAvailability]);

  useEffect(() => {
    if (!countryPickerOpen) {
      return;
    }

    const selectedIndex = filteredCountryOptions.findIndex(
      (country) => country.iso2 === selectedCountry.iso2,
    );
    setCountryHighlightIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [countryPickerOpen, filteredCountryOptions, selectedCountry.iso2]);

  useEffect(() => {
    if (!countryPickerOpen) {
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!countryPickerRef.current) {
        return;
      }

      if (!countryPickerRef.current.contains(event.target as Node)) {
        setCountryPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [countryPickerOpen]);

  useEffect(() => {
    if (!timezonePickerOpen) {
      return;
    }

    const selectedIndex = filteredTimezoneOptions.findIndex(
      (option) => option.value === selectedTimezone,
    );
    setTimezoneHighlightIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [filteredTimezoneOptions, selectedTimezone, timezonePickerOpen]);

  useEffect(() => {
    if (!timezonePickerOpen) {
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!timezonePickerRef.current) {
        return;
      }

      if (!timezonePickerRef.current.contains(event.target as Node)) {
        setTimezonePickerOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [timezonePickerOpen]);

  const startGoogleOauth = async () => {
    try {
      setOauthLoading(true);
      setErrorMessage(null);
      const authUrl = await getGoogleAuthUrl();

      const popup = window.open(
        authUrl,
        "kotnala-google-oauth",
        "width=520,height=720,menubar=no,toolbar=no,location=no,status=no",
      );

      if (!popup) {
        throw new Error("Popup blocked. Please allow popups for authentication.");
      }

      const onMessage = async (event: MessageEvent) => {
        if (!event.data || event.data.type !== "kotnala-oauth") {
          return;
        }

        window.removeEventListener("message", onMessage);

        if (event.data.status === "success") {
          const me = await getProfile();
          setProfile(me);
          setCurrentStep("phone");
          setErrorMessage(null);
          return;
        }

        setErrorMessage("Google authentication failed. Please retry.");
      };

      window.addEventListener("message", onMessage);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Google authentication failed.",
      );
    } finally {
      setOauthLoading(false);
    }
  };

  const onPhoneInputChange = (raw: string) => {
    setPhoneTouched(true);
    const formatter = new AsYouType(selectedCountry.iso2);
    const formatted = formatter.input(raw.replace(/\+/g, ""));
    setPhoneInput(formatted);

    const parsed = parsePhoneNumberFromString(formatted, selectedCountry.iso2);
    if (parsed?.isValid()) {
      setPhoneE164(parsed.number);
    } else {
      setPhoneE164("");
    }
  };

  const onCountrySelect = (country: CountryPhone) => {
    setSelectedCountry(country);
    setCountryPickerOpen(false);
    setCountrySearch("");
    setPhoneTouched(true);
    onPhoneInputChange(phoneInput);
  };

  const goNext = () => {
    const index = stepOrder.indexOf(currentStep);
    const next = stepOrder[index + 1];
    if (next) {
      setCurrentStep(next);
    }
  };

  const goBack = () => {
    const index = stepOrder.indexOf(currentStep);
    const prev = stepOrder[index - 1];
    if (prev) {
      setCurrentStep(prev);
    }
  };

  const onDateClick = (day: Date) => {
    const dateKey = format(day, "yyyy-MM-dd");
    const dayStart = startOfDay(day);

    if (isBefore(dayStart, earliestBookable) || isBefore(lastBookable, dayStart)) {
      return;
    }

    if (settings && !settings.allow_weekends) {
      const w = day.getDay();
      if (w === 0 || w === 6) {
        return;
      }
    }

    if (fullyBookedCache[dateKey]) {
      return;
    }

    setSelectedDate(day);
    setSelectedSlot(null);
    setCurrentStep("slot");
  };

  const confirmBooking = async () => {
    if (!profile || !selectedDate || !selectedSlot || !settings) {
      return;
    }

    try {
      setBookingLoading(true);
      setErrorMessage(null);

      const response = await createBooking(
        {
          phone: phoneE164,
          country: selectedCountry.name,
          countryCode: selectedCountry.dialCode,
          phoneLocal: phoneInput.replace(/\D/g, ""),
          fullPhone: phoneE164,
          company_name: companyName.trim(),
          project_description: projectDescription.trim() || undefined,
          timezone: selectedTimezone,
          date: format(selectedDate, "yyyy-MM-dd"),
          slot_start_utc: selectedSlot.start_utc,
        },
        profile.csrf_token,
      );

      setBookingResult(response);
      setCurrentStep("done");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Booking failed. Please select another slot and retry.",
      );
    } finally {
      setBookingLoading(false);
    }
  };

  const resetFlow = () => {
    setPhoneInput("");
    setPhoneE164("");
    setCompanyName("");
    setProjectDescription("");
    setSelectedDate(null);
    setSelectedSlot(null);
    setAvailability(null);
    setBookingResult(null);
    setCurrentStep("phone");
  };

  const stepTitle: Record<StepKey, string> = {
    oauth: "Continue with Google",
    phone: "Confirm Contact",
    company: "Company and Context",
    date: "Pick a Date",
    slot: "Pick a Time Slot",
    review: "Review and Confirm",
    done: "Booking Confirmed",
  };

  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_15%,oklch(0.45_0.1_245/0.35),transparent_35%),radial-gradient(circle_at_85%_85%,oklch(0.62_0.09_190/0.22),transparent_42%),linear-gradient(180deg,oklch(0.14_0.02_252),oklch(0.1_0.02_255))]" />
      <div className="layout-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_90px_oklch(0.03_0.01_250/0.5)] backdrop-blur-xl sm:p-8"
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-cyan-200/80 uppercase">
                Kotnala Consultancy
              </p>
              <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Book Strategy Call
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-300">
                Premium consultation scheduling with timezone-safe Google Meet invites.
              </p>
            </div>
            <div className="w-full max-w-64">
              <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
                <span>Step {currentStepIndex + 1}</span>
                <span>{stepTitle[currentStep]}</span>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-teal-300"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.35 }}
                />
              </div>
            </div>
          </div>

          {errorMessage ? (
            <div className="mb-4 rounded-xl border border-rose-300/35 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              {errorMessage}
            </div>
          ) : null}

          {profileLoading ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-16 animate-pulse rounded-2xl border border-white/10 bg-white/6"
                />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20, scale: 0.985 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.985 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                {currentStep === "oauth" ? (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-300">
                      Authenticate with Google to auto-import your verified contact profile.
                    </p>
                    <Button
                      onClick={() => void startGoogleOauth()}
                      disabled={oauthLoading}
                      size="lg"
                      className="h-12 w-full border border-cyan-100/30 bg-white text-slate-900 hover:bg-cyan-50"
                    >
                      {oauthLoading ? (
                        <Loader2 className="mr-2 size-4 animate-spin" />
                      ) : (
                        <ShieldCheck className="mr-2 size-4" />
                      )}
                      Continue with Google
                    </Button>
                  </div>
                ) : null}

                {currentStep === "phone" && profile ? (
                  <div className="space-y-5">
                    <div className="rounded-2xl border border-cyan-200/20 bg-slate-950/50 p-4">
                      <p className="text-xs tracking-wide text-cyan-200/80 uppercase">Authenticated as</p>
                      <div className="mt-3 flex items-center gap-3">
                        {profile.avatar_url ? (
                          <img
                            src={profile.avatar_url}
                            alt={profile.full_name}
                            className="size-11 rounded-full border border-white/20 object-cover"
                          />
                        ) : (
                          <div className="flex size-11 items-center justify-center rounded-full border border-white/20 bg-cyan-300/20 text-sm font-semibold text-cyan-100">
                            {profileInitials}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-white">{profile.full_name}</p>
                          <p className="text-sm text-slate-300">{profile.email}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="mt-3 text-xs text-cyan-200 underline underline-offset-4"
                        onClick={() => {
                          void logoutProfile();
                          setProfile(null);
                          setCurrentStep("oauth");
                        }}
                      >
                        Switch Account
                      </button>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
                      <div className="space-y-2" ref={countryPickerRef}>
                        <label htmlFor="country-picker-trigger" className="text-xs text-slate-300">
                          Country
                        </label>
                        <div className="relative">
                          <button
                            id="country-picker-trigger"
                            type="button"
                            aria-haspopup="listbox"
                            aria-expanded={countryPickerOpen}
                            aria-controls="country-picker-listbox"
                            onClick={() => setCountryPickerOpen((prev) => !prev)}
                            onKeyDown={(event) => {
                              if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                setCountryPickerOpen(true);
                              }
                            }}
                            className="flex h-12 w-full items-center justify-between rounded-2xl border border-white/15 bg-slate-900/70 px-3 text-left text-sm text-white shadow-[inset_0_1px_0_oklch(1_0_0/0.08)] backdrop-blur-xl transition-all duration-200 ease-out hover:border-cyan-200/45 hover:bg-slate-900/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60"
                          >
                            <span className="flex min-w-0 items-center gap-2">
                              <span aria-hidden>{countryCodeToFlag(selectedCountry.flag)}</span>
                              <span className="truncate">{selectedCountry.name}</span>
                            </span>
                            <span className="ml-3 flex items-center gap-2 text-slate-300">
                              <span>{selectedCountry.dialCode}</span>
                              <ChevronsUpDown className="size-4" />
                            </span>
                          </button>

                          <AnimatePresence>
                            {countryPickerOpen ? (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.98, y: 8 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98, y: 8 }}
                                transition={{ duration: 0.18, ease: "easeOut" }}
                                className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-950/95 shadow-[0_26px_60px_oklch(0.04_0.01_255/0.72)] backdrop-blur-xl"
                              >
                                <div className="sticky top-0 border-b border-white/10 bg-slate-950/95 p-2">
                                  <label htmlFor="country-picker-search" className="sr-only">
                                    Search country by name or dialing code
                                  </label>
                                  <div className="relative">
                                    <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                                    <input
                                      id="country-picker-search"
                                      value={countrySearch}
                                      onChange={(event) => {
                                        setCountrySearch(event.target.value);
                                        setCountryHighlightIndex(0);
                                      }}
                                      onKeyDown={(event) => {
                                        if (event.key === "Escape") {
                                          event.preventDefault();
                                          setCountryPickerOpen(false);
                                          return;
                                        }

                                        if (!filteredCountryOptions.length) {
                                          return;
                                        }

                                        if (event.key === "ArrowDown") {
                                          event.preventDefault();
                                          setCountryHighlightIndex((prev) =>
                                            Math.min(prev + 1, filteredCountryOptions.length - 1),
                                          );
                                        }

                                        if (event.key === "ArrowUp") {
                                          event.preventDefault();
                                          setCountryHighlightIndex((prev) => Math.max(prev - 1, 0));
                                        }

                                        if (event.key === "Enter") {
                                          event.preventDefault();
                                          const active = filteredCountryOptions[countryHighlightIndex];
                                          if (active) {
                                            onCountrySelect(active);
                                          }
                                        }
                                      }}
                                      autoFocus
                                      placeholder="Search country or +code"
                                      className="h-10 w-full rounded-xl border border-white/12 bg-white/5 pr-3 pl-9 text-sm text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/50"
                                    />
                                  </div>
                                </div>

                                <ul
                                  id="country-picker-listbox"
                                  role="listbox"
                                  aria-label="Country calling code"
                                  className="max-h-72 overflow-y-auto p-2 scrollbar-thin-dark"
                                >
                                  {filteredCountryOptions.length ? (
                                    filteredCountryOptions.map((country, index) => {
                                      const selected = selectedCountry.iso2 === country.iso2;
                                      const highlighted = index === countryHighlightIndex;

                                      return (
                                        <li
                                          key={country.iso2}
                                          id={`country-option-${country.iso2}`}
                                          role="option"
                                          aria-selected={selected}
                                          onMouseEnter={() => setCountryHighlightIndex(index)}
                                          className="mb-1 last:mb-0"
                                        >
                                          <button
                                            type="button"
                                            onClick={() => onCountrySelect(country)}
                                            className={cn(
                                              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-150 ease-out",
                                              highlighted
                                                ? "bg-cyan-300/12 text-cyan-100"
                                                : "text-slate-200 hover:bg-white/8",
                                            )}
                                          >
                                            <span aria-hidden className="text-base leading-none">
                                              {countryCodeToFlag(country.flag)}
                                            </span>
                                            <span className="min-w-0 flex-1 truncate">{country.name}</span>
                                            <span className="ml-3 text-slate-300">{country.dialCode}</span>
                                            {selected ? <Check className="size-4 text-cyan-200" /> : null}
                                          </button>
                                        </li>
                                      );
                                    })
                                  ) : (
                                    <li className="px-3 py-2 text-sm text-slate-400">No country found.</li>
                                  )}
                                </ul>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      </div>

                      <label className="space-y-2">
                        <span className="text-xs text-slate-300">Phone Number</span>
                        <input
                          type="tel"
                          value={phoneInput}
                          onChange={(event) => onPhoneInputChange(event.target.value)}
                          onBlur={() => setPhoneTouched(true)}
                          placeholder="Enter phone number"
                          autoComplete="tel-national"
                          aria-invalid={Boolean(phoneValidationMessage)}
                          className={cn(
                            "h-12 w-full rounded-2xl border bg-slate-900/70 px-3 text-sm text-white placeholder:text-slate-400 shadow-[inset_0_1px_0_oklch(1_0_0/0.08)] backdrop-blur-xl transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60",
                            phoneValidationMessage
                              ? "border-rose-300/65 focus-visible:ring-rose-300/50"
                              : "border-white/15 hover:border-cyan-200/45",
                          )}
                        />
                        {phoneValidationMessage ? (
                          <p className="text-xs text-rose-200">{phoneValidationMessage}</p>
                        ) : null}
                      </label>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        size="lg"
                        className="h-11 px-7 transition-all duration-200 ease-out hover:-translate-y-0.5"
                        disabled={!profile || !phoneIsValid}
                        onClick={() => setCurrentStep("company")}
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                ) : null}

                {currentStep === "company" ? (
                  <div className="space-y-6">
                    <label className="block space-y-2">
                      <span className="text-xs text-slate-300">Company Name *</span>
                      <input
                        value={companyName}
                        onChange={(event) => setCompanyName(event.target.value)}
                        maxLength={160}
                        className="h-11 w-full rounded-xl border border-white/15 bg-slate-900/70 px-3 text-sm text-white placeholder:text-slate-400 focus:outline-none"
                        placeholder="Kotnala Consultancy"
                        required
                      />
                    </label>

                    <div className="space-y-2" ref={timezonePickerRef}>
                      <span className="text-xs text-slate-300">Timezone *</span>
                      <div className="relative">
                        <button
                          type="button"
                          aria-haspopup="listbox"
                          aria-expanded={timezonePickerOpen}
                          aria-controls="timezone-picker-listbox"
                          onClick={() => setTimezonePickerOpen((prev) => !prev)}
                          onKeyDown={(event) => {
                            if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              setTimezonePickerOpen(true);
                            }
                          }}
                          className="flex w-full items-center justify-between rounded-2xl border border-white/15 bg-slate-900/70 px-4 py-3 text-left shadow-[inset_0_1px_0_oklch(1_0_0/0.08)] backdrop-blur-xl transition-all duration-200 ease-out hover:border-cyan-200/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60"
                        >
                          {selectedTimezoneOption ? (
                            <span className="flex min-w-0 items-start gap-3">
                              <Globe2 className="mt-0.5 size-4 shrink-0 text-cyan-200" />
                              <span className="min-w-0">
                                <span className="block truncate text-sm font-medium text-white">
                                  {selectedTimezoneOption.countryCode === "UN"
                                    ? "🌎"
                                    : countryCodeToFlag(selectedTimezoneOption.countryCode)} {selectedTimezoneOption.countryName}
                                </span>
                                <span className="block truncate text-xs text-slate-300">
                                  {selectedTimezoneOption.city} • {selectedTimezoneOption.offsetLabel}
                                </span>
                              </span>
                            </span>
                          ) : (
                            <span className="text-sm text-slate-300">🌎 Select Timezone</span>
                          )}
                          <ChevronsUpDown className="ml-4 size-4 text-slate-300" />
                        </button>

                        <AnimatePresence>
                          {timezonePickerOpen ? (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.98, y: 8 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.98, y: 8 }}
                              transition={{ duration: 0.18, ease: "easeOut" }}
                              className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-950/95 shadow-[0_26px_60px_oklch(0.04_0.01_255/0.72)] backdrop-blur-xl"
                            >
                              <div className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/95 p-2">
                                <label htmlFor="timezone-picker-search" className="sr-only">
                                  Search timezone by country, city, IANA name, or UTC offset
                                </label>
                                <div className="relative">
                                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                                  <input
                                    id="timezone-picker-search"
                                    autoFocus
                                    value={timezoneSearch}
                                    onChange={(event) => {
                                      setTimezoneSearch(event.target.value);
                                      setTimezoneHighlightIndex(0);
                                      setTimezoneScrollTop(0);
                                    }}
                                    onKeyDown={(event) => {
                                      if (event.key === "Escape") {
                                        event.preventDefault();
                                        setTimezonePickerOpen(false);
                                        return;
                                      }

                                      if (!filteredTimezoneOptions.length) {
                                        return;
                                      }

                                      if (event.key === "ArrowDown") {
                                        event.preventDefault();
                                        setTimezoneHighlightIndex((prev) =>
                                          Math.min(prev + 1, filteredTimezoneOptions.length - 1),
                                        );
                                      }

                                      if (event.key === "ArrowUp") {
                                        event.preventDefault();
                                        setTimezoneHighlightIndex((prev) => Math.max(prev - 1, 0));
                                      }

                                      if (event.key === "Enter") {
                                        event.preventDefault();
                                        const active = filteredTimezoneOptions[timezoneHighlightIndex];
                                        if (active) {
                                          setSelectedTimezone(active.value);
                                          setTimezonePickerOpen(false);
                                          setTimezoneSearch("");
                                        }
                                      }
                                    }}
                                    placeholder="Search country, city, timezone, or UTC offset"
                                    className="h-10 w-full rounded-xl border border-white/12 bg-white/5 pr-3 pl-9 text-sm text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/50"
                                  />
                                </div>
                              </div>

                              <div
                                className="max-h-[420px] overflow-y-auto p-2 scrollbar-thin-dark"
                                onScroll={(event) => setTimezoneScrollTop(event.currentTarget.scrollTop)}
                              >
                                <ul
                                  id="timezone-picker-listbox"
                                  role="listbox"
                                  aria-label="Timezone"
                                  className="relative"
                                  style={{ height: `${filteredTimezoneOptions.length * timezoneRowHeight}px` }}
                                >
                                  {timezoneWindow.items.map((option, localIndex) => {
                                    const absoluteIndex = timezoneWindow.startIndex + localIndex;
                                    const selected = option.value === selectedTimezone;
                                    const highlighted = absoluteIndex === timezoneHighlightIndex;

                                    return (
                                      <li
                                        key={option.value}
                                        id={`timezone-option-${option.value}`}
                                        role="option"
                                        aria-selected={selected}
                                        className="absolute left-0 w-full"
                                        style={{ top: `${absoluteIndex * timezoneRowHeight}px` }}
                                        onMouseEnter={() => setTimezoneHighlightIndex(absoluteIndex)}
                                      >
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setSelectedTimezone(option.value);
                                            setTimezonePickerOpen(false);
                                            setTimezoneSearch("");
                                          }}
                                          className={cn(
                                            "mb-1 flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-150 ease-out",
                                            highlighted
                                              ? "bg-cyan-300/12 text-cyan-100"
                                              : "text-slate-200 hover:bg-white/8",
                                          )}
                                        >
                                          <span className="mt-0.5 text-base leading-none">
                                            {option.countryCode === "UN" ? "🌎" : countryCodeToFlag(option.countryCode)}
                                          </span>
                                          <span className="min-w-0 flex-1">
                                            <span className="block truncate text-sm font-medium text-white">
                                              {option.countryName}
                                            </span>
                                            <span className="block truncate text-xs text-slate-300">{option.city}</span>
                                            <span className="block text-xs text-cyan-200/85">{option.offsetLabel}</span>
                                          </span>
                                          {selected ? <Check className="mt-1 size-4 text-cyan-200" /> : null}
                                        </button>
                                      </li>
                                    );
                                  })}

                                  {!filteredTimezoneOptions.length ? (
                                    <li className="px-3 py-2 text-sm text-slate-400">No timezone found.</li>
                                  ) : null}
                                </ul>
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    </div>

                    <label className="block space-y-2">
                      <span className="text-xs text-slate-300">Project / Problem Description</span>
                      <textarea
                        value={projectDescription}
                        onChange={(event) => setProjectDescription(event.target.value.slice(0, 1000))}
                        placeholder="Describe your project, current challenges, goals, or topics you'd like to discuss."
                        className="min-h-30 w-full rounded-xl border border-white/15 bg-slate-900/70 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none"
                      />
                      <p className="text-right text-xs text-slate-400">{projectDescription.length}/1000</p>
                    </label>

                    <div className="flex justify-between pt-2">
                      <Button variant="outline" onClick={goBack} className="h-11 border-white/25 bg-transparent text-white">
                        Back
                      </Button>
                      <Button
                        className="h-11"
                        disabled={!companyName.trim() || !selectedTimezone}
                        onClick={() => setCurrentStep("date")}
                      >
                        Continue to Date
                      </Button>
                    </div>
                  </div>
                ) : null}

                {currentStep === "date" ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        onClick={() => setMonthDate((prev) => subMonths(prev, 1))}
                        className="text-white"
                        aria-label="Previous month"
                      >
                        <ChevronLeft className="size-4" />
                      </Button>
                      <h3 className="text-lg font-semibold text-white">{format(monthDate, "MMMM yyyy")}</h3>
                      <Button
                        variant="ghost"
                        onClick={() => setMonthDate((prev) => addMonths(prev, 1))}
                        className="text-white"
                        aria-label="Next month"
                      >
                        <ChevronRight className="size-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-400">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                        <div key={day} className="py-2">{day}</div>
                      ))}

                      {calendarDays.map((day) => {
                        const key = format(day, "yyyy-MM-dd");
                        const outOfRange =
                          isBefore(startOfDay(day), earliestBookable) ||
                          isBefore(lastBookable, startOfDay(day));
                        const weekendBlocked =
                          settings &&
                          !settings.allow_weekends &&
                          (day.getDay() === 0 || day.getDay() === 6);
                        const fullyBooked = fullyBookedCache[key] === true;
                        const disabled =
                          !isSameMonth(day, monthDate) || outOfRange || weekendBlocked || fullyBooked;

                        return (
                          <button
                            key={key}
                            type="button"
                            disabled={disabled}
                            onClick={() => onDateClick(day)}
                            className={cn(
                              "h-12 rounded-xl border text-sm transition",
                              disabled
                                ? "cursor-not-allowed border-white/5 bg-white/5 text-slate-600"
                                : "border-white/15 bg-slate-900/50 text-slate-100 hover:-translate-y-0.5 hover:border-cyan-200/70 hover:shadow-[0_0_25px_oklch(0.7_0.08_220/0.25)]",
                              selectedDate && isSameDay(day, selectedDate) &&
                                "border-cyan-300 bg-cyan-300/15 text-cyan-100",
                            )}
                            aria-label={`Choose ${format(day, "PPPP")}`}
                          >
                            {format(day, "d")}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={goBack} className="h-11 border-white/25 bg-transparent text-white">
                        Back
                      </Button>
                      <Button
                        onClick={() => selectedDate && setCurrentStep("slot")}
                        disabled={!selectedDate}
                        className="h-11"
                      >
                        Continue to Slots
                      </Button>
                    </div>
                  </div>
                ) : null}

                {currentStep === "slot" ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {selectedDate ? format(selectedDate, "EEEE, d MMMM yyyy") : "Select a date"}
                        </h3>
                        <p className="text-sm text-slate-300">Timezone: {selectedTimezone}</p>
                      </div>
                      <Button variant="outline" onClick={() => setCurrentStep("date")} className="border-white/25 bg-transparent text-white">
                        Change Date
                      </Button>
                    </div>

                    {availabilityLoading ? (
                      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
                        {Array.from({ length: 16 }).map((_, idx) => (
                          <div key={idx} className="h-11 animate-pulse rounded-xl border border-white/10 bg-white/5" />
                        ))}
                      </div>
                    ) : (
                      <div className="grid max-h-84 gap-3 overflow-y-auto pr-1 sm:grid-cols-3 lg:grid-cols-4 scrollbar-thin-dark">
                        {availability?.slots.map((slot) => (
                          <button
                            type="button"
                            key={slot.start_utc}
                            onClick={() => slot.available && setSelectedSlot(slot)}
                            disabled={!slot.available}
                            className={cn(
                              "h-11 rounded-xl border text-sm transition",
                              slot.available
                                ? "border-cyan-200/35 bg-slate-900/45 text-slate-100 hover:-translate-y-0.5 hover:border-cyan-200/80 hover:shadow-[0_0_24px_oklch(0.72_0.08_226/0.24)]"
                                : "cursor-not-allowed border-white/7 bg-white/5 text-slate-600 blur-[0.15px]",
                              selectedSlot?.start_utc === slot.start_utc &&
                                "border-cyan-300 bg-cyan-300/15 text-cyan-100",
                            )}
                          >
                            {slot.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {!availabilityLoading && availability?.slots.length === 0 ? (
                      <p className="rounded-xl border border-amber-300/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                        No slots available for this day. Please pick another date.
                      </p>
                    ) : null}

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setCurrentStep("date")} className="h-11 border-white/25 bg-transparent text-white">
                        Back
                      </Button>
                      <Button
                        onClick={() => setCurrentStep("review")}
                        disabled={!selectedSlot}
                        className="h-11"
                      >
                        Continue to Review
                      </Button>
                    </div>
                  </div>
                ) : null}

                {currentStep === "review" && profile && selectedDate && selectedSlot && settings ? (
                  <div className="space-y-5">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <SummaryCard label="Google Account" value={profile.email} />
                      <SummaryCard label="Phone" value={phoneE164} />
                      <SummaryCard label="Company" value={companyName} />
                      <SummaryCard
                        label="Timezone"
                        value={selectedTimezoneOption ? selectedTimezoneOption.displayLabel : selectedTimezone}
                      />
                      <SummaryCard label="Date" value={format(selectedDate, "PPPP")} />
                      <SummaryCard label="Time" value={selectedSlot.label} />
                      <SummaryCard label="Duration" value={`${settings.meeting_duration_minutes} minutes`} />
                    </div>

                    <SummaryCard
                      label="Problem Statement"
                      value={projectDescription || "Not provided"}
                    />

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setCurrentStep("slot")} className="h-11 border-white/25 bg-transparent text-white">
                        Back
                      </Button>
                      <Button
                        onClick={() => void confirmBooking()}
                        disabled={bookingLoading}
                        className="h-11 px-6"
                      >
                        {bookingLoading ? (
                          <Loader2 className="mr-2 size-4 animate-spin" />
                        ) : null}
                        Confirm Booking
                      </Button>
                    </div>
                  </div>
                ) : null}

                {currentStep === "done" && profile && selectedDate && selectedSlot ? (
                  <div className="space-y-6 text-center">
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="mx-auto flex size-20 items-center justify-center rounded-full border border-emerald-300/50 bg-emerald-400/15"
                    >
                      <CheckCircle2 className="size-10 text-emerald-300" />
                    </motion.div>

                    <div>
                      <h2 className="text-2xl font-semibold text-white">Booking Confirmed</h2>
                      <p className="mt-2 text-slate-300">
                        Google Meet scheduled and invitation sent. Please accept your calendar invite.
                      </p>
                    </div>

                    <div className="grid gap-3 text-left sm:grid-cols-2">
                      <SummaryCard label="Date" value={format(selectedDate, "PPPP")} />
                      <SummaryCard label="Time" value={selectedSlot.label} />
                      <SummaryCard
                        label="Timezone"
                        value={selectedTimezoneOption ? selectedTimezoneOption.displayLabel : selectedTimezone}
                      />
                      <SummaryCard label="Google Account" value={profile.email} />
                    </div>

                    {bookingResult?.meet_link ? (
                      <a
                        href={bookingResult.meet_link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-xl border border-cyan-200/40 bg-cyan-300/15 px-5 py-3 text-sm font-medium text-cyan-50 hover:bg-cyan-300/25"
                      >
                        Open Google Meet Link
                      </a>
                    ) : null}

                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <Link
                        href="/"
                        className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 px-5 text-sm text-white"
                      >
                        Back to Website
                      </Link>
                      <Button onClick={resetFlow} className="h-11 px-5">
                        Book Another Meeting
                      </Button>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>

    </section>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/6 p-3">
      <p className="text-[11px] tracking-wide text-slate-400 uppercase">{label}</p>
      <p className="mt-1 text-sm text-slate-100">{value}</p>
    </div>
  );
}
