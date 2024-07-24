import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.api-ninjas.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": process.env.REACT_APP_API_KEY,
  },
});

export default axiosInstance;
