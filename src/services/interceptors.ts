// import { API_KEY, APPLICATION_KEY, BASE_URL } from "./config";
// import axios from "axios";
// import tokenStorage from "./tokenStorage";

// export const services = axios.create({
//   baseURL: BASE_URL,
//   timeout: 30000, // 30 seconds timeout
//   timeoutErrorMessage: "Request timed out. Please check your internet connection and try again.",
// });

// services.interceptors.request.use(async (config) => {
//   const token = tokenStorage.getToken();
//   if (token) {
//     config.headers.token = token;
//     config.headers.apiKey = API_KEY;
//     config.headers.applicationKey = APPLICATION_KEY;
//   } else {
//     config.headers.token = "";
//     config.headers.apiKey = API_KEY;
//     config.headers.applicationKey = APPLICATION_KEY;
//   }
//   return config;
// });

// services.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (axios.isAxiosError(error)) {
//       if (error.code === 'ECONNABORTED') {
//         return Promise.reject({
//           code: 408,
//           message: "Request timed out. Please check your internet connection and try again.",
//         });
//       }
//       if (error.response) {
//         return Promise.reject({
//           code: error.response.status,
//           message: error.response.data.message || "Server error occurred",
//         });
//       } else if (error.request) {
//         return Promise.reject({
//           code: 0,
//           message: "No response received from server. Please check your internet connection.",
//         });
//       } else {
//         return Promise.reject({
//           code: 999,
//           message: error.message || "An unexpected error occurred",
//         });
//       }
//     }
//     return Promise.reject(error);
//   }
// );
