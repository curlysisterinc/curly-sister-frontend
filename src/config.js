/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
import axios from "axios";
import Cookies from "js-cookie";
import TokenValidate from "./tokenValidate";

/** Base Url for api STAGING */
// const apiUrl = "https://live.curly-sisters.beargaze.com";
const apiUrl = process.env.REACT_APP_API_URL;
/** Base Url for api PRODUCTION */
// const apiUrl = "https://megaletrics.beargaze.com/";

/** Base Url for Images STAGING */
// const curlySistersImageUrl = "https://live.curly-sisters.beargaze.com";
const curlySistersImageUrl = process.env.REACT_APP_API_URL;
/** Base Url for Images PRODUCTION */
// const imageBaseUrl = "https://megaletrics.beargaze.com/";

/** axios API for Signup and Login users with no token  */
const curlySistersOnboarding = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// JWT DECODE SETUP
// Request Interceptor
const curlySistersApi = axios.create({
  baseURL: apiUrl,
});
curlySistersApi.interceptors.request.use(
  async (config) => {
    if (config.url.includes("/login")) return config;
    if (config.url.includes("/refresh-token")) return config;

    TokenValidate();
    config.headers.Authorization = `${Cookies.get("accessToken")}`;
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Request Interceptor
const curlySistersFormDataApi = axios.create({
  baseURL: apiUrl,
});
curlySistersFormDataApi.interceptors.request.use(
  async (config) => {
    if (config.url.includes("/login")) return config;
    if (config.url.includes("/refresh-token")) return config;

    TokenValidate();
    config.headers.Authorization = `${Cookies.get("accessToken")}`;
    config.headers["Content-Type"] = "multipart/form-data";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
curlySistersApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const request = error.config; // this is actual request that was sent, and error is received in response to that request
    if (
      navigator.onLine === false ||
      (error.response.status === 401 && !request._retry)
    ) {
      request._retry = true;
      axios.defaults.headers.common.Authorization = `Bearer ${Cookies.get(
        "accessToken"
      )}`;
      axios.defaults.headers.common["Content-Type"] = "application/json";
      return axios(request);
    }
    return Promise.reject(error);
  }
);

// Response Interceptor
curlySistersFormDataApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const request = error.config; // this is actual request that was sent, and error is received in response to that request
    if (
      navigator.onLine === false ||
      (error.response.status === 401 && !request._retry)
    ) {
      request._retry = true;
      axios.defaults.headers.common.Authorization = `Bearer ${Cookies.get(
        "accessToken"
      )}`;
      axios.defaults.headers.common["Content-Type"] = "application/json";
      return axios(request);
    }
    return Promise.reject(error);
  }
);

export {
  curlySistersOnboarding,
  curlySistersFormDataApi,
  curlySistersApi,
  curlySistersImageUrl,
};
