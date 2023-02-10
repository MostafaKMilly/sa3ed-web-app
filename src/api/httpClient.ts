import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosHeaders,
} from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: "http://helpus.eu-4.evennode.com/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

// Request interceptor to pass token from local storage in request headers
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const auth = token ? `${token}` : "";
  (config.headers as AxiosHeaders)?.set("x-auth-token", auth);
  return config;
});

// response interceptor to catch all errors
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function ({ response }: AxiosError<TErrorResponse>) {
    console.log(response);
    toast(response?.data?.msg, {
      type: "error",
      position: toast.POSITION.TOP_CENTER,
    });
  }
);

/**
 * @param string url - endpoint url
 * @param transformResponse callback to change response data
 * @param {AxiosRequestConfig} config - get request config
 * @returns Promise
 */
const get = <T = AxiosResponse, R = Record<string, any>>(
  url: string,
  transformResponse?: TransformResFn<T, R>,
  config?: AxiosRequestConfig
): Promise<T> => {
  return instance.get(url, config).then((res: any) => {
    return new Promise<T>((resolve) => {
      if (transformResponse) {
        resolve(transformResponse(res.data));
      } else {
        resolve(res);
      }
    });
  });
};

/**
 * @param string url - endpoint url
 * @param Record<string,any> data - reqeust data
 * @param {AxiosRequestConfig} requestConfig - post request config
 * @returns Promise
 */
const post = <T = AxiosResponse, R = Record<string, any>>(
  url: string,
  data: Record<string, any>,
  transformResponse?: TransformResFn<T, R>,
  config?: AxiosRequestConfig
): Promise<T> => {
  return instance.post(url, data, config).then((res: any) => {
    return new Promise<T>((resolve) => {
      if (transformResponse) {
        resolve(transformResponse(res.data));
      } else {
        resolve(res);
      }
    });
  });
};

/**
 * @param string url - endpoint url
 * @param Record<string,any> data - reqeust data
 * @param {AxiosRequestConfig} requestConfig - put request config
 * @returns Promise
 */
const put = <T = AxiosResponse, R = Record<string, any>>(
  url: string,
  data: Record<string, any>,
  transformResponse?: TransformResFn<T, R>,
  config?: AxiosRequestConfig
): Promise<T> => {
  return instance.put(url, data, config).then((res: any) => {
    return new Promise<T>((resolve) => {
      if (transformResponse) {
        resolve(transformResponse(res.data));
      } else {
        resolve(res);
      }
    });
  });
};

/**
 * @param string url - endpoint url
 * @param {AxiosRequestConfig} requestConfig - delete request config
 * @returns Promise
 */
const remove = <T = AxiosResponse>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  return instance.delete(url, config);
};

const API = {
  get,
  post,
  put,
  remove,
};

export type TransformResFn<T, R = unknown> = (res: R) => T;

export type TErrorResponse = {
  error: Record<string, any>;
  msg?: string;
};

export default API;
