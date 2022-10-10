import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
// import { ApiResponse } from '../model';

export const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15 * 1000,
});

export const customAxios = <T>(config: AxiosRequestConfig): Promise<T> => {
  const beginAt = new Date().getTime();
  const method = config.method ?? 'GET';
  const url = config.url;

  console.log(method, url);

  return axiosInstance({
    ...config,
    withCredentials: true,
  }).then((response) => {
    const endAt = new Date().getTime();
    const diff = (endAt - beginAt) / 1000;

    console.group('(', diff, ')', method, url);
    console.log('response', response);
    console.log('data', response.data);
    console.log('config', response.config);
    console.log('request', response.request);
    console.groupEnd();

    return response.data as T;
  });
};

export class DeveloggerError<T> extends AxiosError<T> {}

export interface ErrorType<Error> extends DeveloggerError<Error> {}

// export type CustomErrorType = DeveloggerError<ApiResponse>;
