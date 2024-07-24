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

// export type PostFormData = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   age: number;
//   photo: File;
//   date: Date;
// };

export type ErrorObject = {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  age?: string | null;
  photo?: string | null;
  selectedDate?: string | null;
  selectedTime?: string | null;
};
