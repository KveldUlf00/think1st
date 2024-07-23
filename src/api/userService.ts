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
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching holidays:", error);
    throw error;
  }
};
