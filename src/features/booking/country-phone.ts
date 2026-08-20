import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import type { CountryCode } from "libphonenumber-js";

export type CountryPhone = {
  name: string;
  iso2: CountryCode;
  dialCode: string;
  flag: CountryCode;
};

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

const builtCountryPhoneOptions = getCountries()
  .map((iso2) => {
    const name = regionNames.of(iso2) ?? iso2;
    const dialCode = `+${getCountryCallingCode(iso2)}`;

    return {
      name,
      iso2,
      dialCode,
      flag: iso2,
    } satisfies CountryPhone;
  })
  .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));

export const countryPhoneOptions: CountryPhone[] = builtCountryPhoneOptions;

export function countryCodeToFlag(iso2: string): string {
  return iso2
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
}
