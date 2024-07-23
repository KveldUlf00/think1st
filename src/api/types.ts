export type CountryCode = "PL" | "US" | "GB";

export type Year = number;

export enum DateType {
  NationalHoliday = "NATIONAL_HOLIDAY",
  Observance = "OBSERVANCE",
}

export interface Holiday {
  country: string;
  date: string;
  day: string;
  iso: string;
  name: string;
  type: string;
  year: number;
}
