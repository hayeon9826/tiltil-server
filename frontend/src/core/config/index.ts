export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://tiltil-server.herokuapp.com/'"
    : "http://localhost:3000";

export const configs = {
  API_URL:
    process.env.NODE_ENV === "production"
      ? "https://tiltil-server.herokuapp.com/'"
      : "http://localhost:3000",
  SERVICE_URL:
    process.env.NODE_ENV === "production"
      ? "https://tiltil-server.vercel.app/"
      : "http://localhost:8080",
  ENV: process.env.NODE_ENV || "development",
  VERSION: process.env.VERSION || "1",
};

export const IS_PRODUCTION = process.env.NODE_ENV === "production";
