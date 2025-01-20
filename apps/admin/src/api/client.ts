import axios from "redaxios";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000",
});
