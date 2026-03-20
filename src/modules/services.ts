// // Local Servers
// // export const BASE_URL: string = 'https://1786vqrk-9088.inc1.devtunnels.ms/'; // Darshan
// // export const BASE_URL: string = 'https://pn5m5nf6-9087.inc1.devtunnels.ms/'; // Ujef
// // export const BASE_URL: string = 'https://p8rhkmb7-9087.inc1.devtunnels.ms/'; // Bahubali
// // export const BASE_URL: string = 'https://e9c6-2401-4900-1c9b-720e-7c61-c354-55fe-1c8b.ngrok-free.app/'; // Kedar Sir
// // export const BASE_URL: string = 'https://m9fz3n36-9087.inc1.devtunnels.ms/'; //pranali

// // Testing Server
// export const BASE_URL: string = 'https://gttiansadmin.uvtechsoft.com:9087/';

// // Live Server
// // export const BASE_URL: string = '';
// export const API_KEY: string = '7IYSvIkHUmCXvkzve4gmxPVT6C59ku6Z';
// export const APPLICATION_KEY: string = 'ZJvv6U5d562IEFMy';
// export const IMAGE_URL = `${BASE_URL}static/`;

// // Razorpay Keys
// export const RAZOR_PAY_KEY = 'rzp_test_SO1E5ovbNuNP0B';
// // export const RAZOR_PAY_KEY = 'rzp_live_DOp7EcIfA7r6VE';

// import axios from 'axios';
// import {tokenStorage, useStorage} from './hooks';
// import {getDeviceId} from './device';
// // import {Reducers} from '../context';

// const deviceID = getDeviceId();

// // Axios Instance
// export const apiCall = axios.create({
//   baseURL: BASE_URL,
//   timeout: 15000,
//   timeoutErrorMessage: `We're having a bit of a snag connecting to the server. Let's try again later.`,
// });

// // Request Interceptor
// apiCall.interceptors.request.use(config => {
//   const token = tokenStorage.getToken();

//   // Log the full request URL for debugging purposes
//   console.log('Request URL:', `${config.baseURL}${config.url}`);

//   config.headers.token = token || '';
//   config.headers.apiKey = API_KEY;
//   config.headers.applicationKey = APPLICATION_KEY;
//   config.headers.deviceId = deviceID;
//   return config;
// });

// // Response Interceptor
// apiCall.interceptors.response.use(
//   function (response) {
//     console.log(
//       'success::',
//       new URL(response.config.url!, response.config.baseURL!).href,
//       response.config.data,
//     );
//     console.log('response', response);
//     return response;
//   },
//   function (error) {
//     if (axios.isAxiosError(error)) {
//       if (error.response) {
//         console.error(error);
//         if (error.response.status === 301) {
//           tokenStorage.setToken('');
//           useStorage.set(`user`, '');
//           // Instead of using dispatch directly, we'll return an object that can be handled by the component
//           return Promise.reject({
//             code: error.response.status,
//             message: 'Session expired. Please login again.',
//             data: error.response.data,
//             requiresLogout: true,
//           });
//         } else if (error.response.status === 404) {
//           console.error('Error 404: Resource not found at', error.config?.url);
//         }
//         return Promise.reject({
//           code: error.response.status,
//           message: error.response.data?.message || 'Server error occurred',
//           data: error.response.data,
//         });
//       } else if (error.request) {
//         return Promise.reject({
//           code: 999,
//           message:
//             'No response received from server. Please check your internet connection.',
//           data: error.request,
//         });
//       } else {
//         return Promise.reject({
//           code: 999,
//           message: error.message || 'Request configuration error',
//           data: error.code,
//         });
//       }
//     } else {
//       return Promise.reject({
//         code: 999,
//         message: 'An unexpected error occurred',
//         data: error,
//       });
//     }
//   },
// );
