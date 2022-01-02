import axios from "axios";
import { API_URL } from "@config";
import packageJson from "../../../package.json";

/** 리터럴 혹은 불변 객체 */
export const TOKEN_KEY = `${packageJson.name}_TOKEN`;
export const CSRF_KEY = `${packageJson.name}_CSRF`;

const getToken = () => ({
  csrf: window.localStorage.getItem(CSRF_KEY),
  token: window.localStorage.getItem(TOKEN_KEY),
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// const refreshInterceptor = (axiosInstance: any) => (error: any) => {
//   const _axios = axiosInstance;
//   const originalRequest = error.config;
//   if (
//     error.response?.status === 401 &&
//     !originalRequest._retry &&
//     error.response?.data?.error !== "Pundit Error"
//   ) {
//     if (isRefreshing) {
//       return new Promise((resolve, reject) => {
//         failedQueue.push({ resolve, reject });
//       })
//         .then((token) => {
//           originalRequest.headers.Authorization = `Bearer ${token}`;
//           return _axios.request(originalRequest);
//         })
//         .catch((err) => Promise.reject(err));
//     }

//     originalRequest._retry = true;
//     isRefreshing = true;

//     return new Promise((resolve, reject) => {
//       const { token: oldToken, csrf: oldCsrf } = getToken();
//       axios
//         .post(
//           `${API_URL}/token`,
//           {},
//           {
//             headers: {
//               "X-CSRF-TOKEN": oldCsrf,
//               Authorization: `Bearer ${oldToken}`,
//             },
//           }
//         )
//         .then((res) => {
//           const { csrf, token } = res.data;
//           authenticateUserThroughPortal({ csrf, token });
//           _axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//           originalRequest.headers.Authorization = `Bearer ${token}`;
//           processQueue(null, token);
//           resolve(_axios(originalRequest));
//         })
//         .catch((err) => {
//           processQueue(err, null);
//           unAuthenticateUserThroughPortal();
//           reject(err);
//         })
//         .finally(() => {
//           isRefreshing = false;
//         });
//     });
//   }

//   return Promise.reject(error);
// };

const headerTokenConfig = (config: any) => {
  const method = config.method.toUpperCase();
  if (method !== "OPTIONS") {
    const { csrf, token } = getToken();
    config.headers = {
      ...config.headers,
      "X-CSRF-TOKEN": csrf,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
};

const API = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: "Bearer *",
  },
});

API.interceptors.request.use(headerTokenConfig);
// API.interceptors.response.use(null, refreshInterceptor(API));

export { API };
