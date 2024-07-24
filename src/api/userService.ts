import axiosInstance from "./axiosInstance";
import { CountryCode, Holiday, Year } from "./types";

export const getHolidays = async (
  country: CountryCode,
  year: Year
): Promise<Holiday[]> => {
  try {
    const response = await axiosInstance.get("/v1/holidays", {
      params: {
        country,
        year,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching holidays:", error);
    throw error;
  }
};

export const postFormData = async (formData: FormData): Promise<unknown> => {
  try {
    const response = await axiosInstance.post(
      "http://letsworkout.pl/submit",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting data:", error);
    throw error;
  }
};
