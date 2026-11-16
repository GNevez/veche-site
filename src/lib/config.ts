export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:5006" : "https://api.veche.com.br")
).replace(/\/$/, "");

export const WEB_APP_URL = (
  process.env.NEXT_PUBLIC_WEB_APP_URL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:3100" : "https://app.veche.com.br")
).replace(/\/$/, "");

export const WEB_LOGIN_URL = `${WEB_APP_URL}/home/`;
