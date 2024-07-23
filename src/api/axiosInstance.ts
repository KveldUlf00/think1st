import axios from "axios";
// TODO WEZ TEN API KEY GDZIES WYWAL

const axiosInstance = axios.create({
  baseURL: "https://api.api-ninjas.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": "8DX8eEe67njS1lbThFsdSw==rQQNpQ8PYbPZBjrx",
  },
});

export default axiosInstance;
