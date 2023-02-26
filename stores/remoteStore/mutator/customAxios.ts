import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
// import { ApiResponse } from '../model';

export const axiosInstance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15 * 1000,
});

type CustomAxiosProps = AxiosRequestConfig & {
  Authentication?: string;
};

export const customAxios = <T>(config: CustomAxiosProps): Promise<T> => {
  const headers = config?.Authentication
    ? {
        ...config?.headers,
        Cookie: `Authentication=${config?.Authentication || ''}`,
      }
    : config?.headers;

  return axiosInstance({
    ...config,
    headers,
    withCredentials: true,
  }).then((response) => response.data as T);
};

export class DeveloggerError<T> extends AxiosError<T> {}

export interface ErrorType<Error> extends DeveloggerError<Error> {}

// export type CustomErrorType = DeveloggerError<ApiResponse>;
