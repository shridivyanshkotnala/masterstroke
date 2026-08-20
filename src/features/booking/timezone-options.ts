import ct from "countries-and-timezones";

import { countryCodeToFlag } from "@/features/booking/country-phone";

export type TimezoneOption = {
  value: string;
  countryName: string;
  countryCode: string;
  city: string;
  offsetLabel: string;
  displayLabel: string;
  searchText: string;
};

const regionFallbackLabels: Record<string, string> = {
  Africa: "Africa",
  America: "United States",
  Antarctica: "Antarctica",
  Arctic: "Arctic",
  Asia: "Asia",
  Atlantic: "Atlantic",
  Australia: "Australia",
  Europe: "Europe",
  Indian: "Indian Ocean",
  Pacific: "Pacific",
  UTC: "Coordinated Universal Time",
  Etc: "Coordinated Universal Time",
};

function formatUtcOffset(timezone: string): string {
  const timeZoneName = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    timeZoneName: "longOffset",
  })
    .formatToParts(new Date())
    .find((part) => part.type === "timeZoneName")?.value;

  if (!timeZoneName || timeZoneName === "GMT") {
    return "UTC +00:00";
  }

  const match = timeZoneName.match(/^GMT([+-])(\d{1,2})(?::(\d{2}))?$/);
  if (!match) {
    return timeZoneName.replace("GMT", "UTC ");
  }

  const [, sign, hourRaw, minuteRaw] = match;
  const hour = hourRaw.padStart(2, "0");
  const minute = (minuteRaw ?? "00").padStart(2, "0");

  return `UTC ${sign}${hour}:${minute}`;
}

function extractCityLabel(iana: string): string {
  const parts = iana.split("/");
  if (parts.length < 2) {
    return iana;
  }

  return parts
    .slice(1)
    .join(" / ")
    .replace(/_/g, " ");
}

function resolveCountry(iana: string): { countryName: string; countryCode: string } {
  const tz = ct.getTimezone(iana);
  const countryCode = tz?.countries?.[0];

  if (countryCode) {
    const country = ct.getCountry(countryCode);
    if (country?.name) {
      return { countryName: country.name, countryCode };
    }
  }

  const region = iana.split("/")[0] ?? "UTC";
  return {
    countryName: regionFallbackLabels[region] ?? region,
    countryCode: "UN",
  };
}

export function buildTimezoneOptions(timezones: string[]): TimezoneOption[] {
  return timezones
    .map((timezone) => {
      const { countryName, countryCode } = resolveCountry(timezone);
      const city = extractCityLabel(timezone);
      const offsetLabel = formatUtcOffset(timezone);
      const flag = countryCode === "UN" ? "🌎" : countryCodeToFlag(countryCode);

      return {
        value: timezone,
        countryName,
        countryCode,
        city,
        offsetLabel,
        displayLabel: `${flag} ${countryName} • ${city} • ${offsetLabel}`,
        searchText: `${countryName} ${city} ${timezone} ${offsetLabel}`.toLowerCase(),
      } satisfies TimezoneOption;
    })
    .sort((a, b) => {
      const countryCompare = a.countryName.localeCompare(b.countryName, "en", {
        sensitivity: "base",
      });
      if (countryCompare !== 0) {
        return countryCompare;
      }

      return a.city.localeCompare(b.city, "en", { sensitivity: "base" });
    });
}

export function defaultTimezoneFromOptions(options: TimezoneOption[]): string {
  if (options.some((option) => option.value === "America/New_York")) {
    return "America/New_York";
  }

  if (options.some((option) => option.value === "US/Eastern")) {
    return "US/Eastern";
  }

  return options[0]?.value ?? "UTC";
}
