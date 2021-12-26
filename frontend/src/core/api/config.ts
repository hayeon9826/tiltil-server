import axios from "axios";
import { API_URL } from "@config";

export const API = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: "Bearer *",
  },
});
