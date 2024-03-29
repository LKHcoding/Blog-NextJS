/**
 * Do not edit manually.
 * Blog nestjs API
 * OpenAPI spec version: 1.0
 */
import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  QueryKey,
} from '@tanstack/react-query';
import type { UserDto, GetUsersAllParams, LocalSignUpRequestDto } from '../../model';
import { customAxios } from '../../mutator/customAxios';
import type { ErrorType } from '../../mutator/customAxios';

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

/**
 * @summary 유저 전체 조회
 */
export const getUsersAll = (params: GetUsersAllParams, signal?: AbortSignal) => {
  return customAxios<UserDto[]>({ url: `/v1/users/all`, method: 'get', params, signal });
};

export const getGetUsersAllQueryKey = (params: GetUsersAllParams) => [
  `/v1/users/all`,
  ...(params ? [params] : []),
];

export type GetUsersAllQueryResult = NonNullable<Awaited<ReturnType<typeof getUsersAll>>>;
export type GetUsersAllQueryError = ErrorType<unknown>;

export const useGetUsersAll = <
  TData = Awaited<ReturnType<typeof getUsersAll>>,
  TError = ErrorType<unknown>
>(
  params: GetUsersAllParams,
  options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getUsersAll>>, TError, TData> }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetUsersAllQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getUsersAll>>> = ({ signal }) =>
    getUsersAll(params, signal);

  const query = useQuery<Awaited<ReturnType<typeof getUsersAll>>, TError, TData>(
    queryKey,
    queryFn,
    queryOptions
  ) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};

/**
 * @summary 특정 유저 조회
 */
export const getUsersLoginID = (loginID: string, signal?: AbortSignal) => {
  return customAxios<UserDto>({ url: `/v1/users/${loginID}`, method: 'get', signal });
};

export const getGetUsersLoginIDQueryKey = (loginID: string) => [`/v1/users/${loginID}`];

export type GetUsersLoginIDQueryResult = NonNullable<Awaited<ReturnType<typeof getUsersLoginID>>>;
export type GetUsersLoginIDQueryError = ErrorType<void>;

export const useGetUsersLoginID = <
  TData = Awaited<ReturnType<typeof getUsersLoginID>>,
  TError = ErrorType<void>
>(
  loginID: string,
  options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getUsersLoginID>>, TError, TData> }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetUsersLoginIDQueryKey(loginID);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getUsersLoginID>>> = ({ signal }) =>
    getUsersLoginID(loginID, signal);

  const query = useQuery<Awaited<ReturnType<typeof getUsersLoginID>>, TError, TData>(
    queryKey,
    queryFn,
    { enabled: !!loginID, ...queryOptions }
  ) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};

/**
 * @summary 내 정보 조회
 */
export const getUsers = (signal?: AbortSignal) => {
  return customAxios<UserDto>({ url: `/v1/users`, method: 'get', signal });
};

export const getGetUsersQueryKey = () => [`/v1/users`];

export type GetUsersQueryResult = NonNullable<Awaited<ReturnType<typeof getUsers>>>;
export type GetUsersQueryError = ErrorType<void>;

export const useGetUsers = <
  TData = Awaited<ReturnType<typeof getUsers>>,
  TError = ErrorType<void>
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getUsers>>, TError, TData>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetUsersQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getUsers>>> = ({ signal }) =>
    getUsers(signal);

  const query = useQuery<Awaited<ReturnType<typeof getUsers>>, TError, TData>(queryKey, queryFn, {
    staleTime: 0,
    cacheTime: 0,
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};

/**
 * @summary Local 회원가입
 */
export const postUsers = (localSignUpRequestDto: LocalSignUpRequestDto) => {
  return customAxios<void>({
    url: `/v1/users`,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: localSignUpRequestDto,
  });
};

export type PostUsersMutationResult = NonNullable<Awaited<ReturnType<typeof postUsers>>>;
export type PostUsersMutationBody = LocalSignUpRequestDto;
export type PostUsersMutationError = ErrorType<unknown>;

export const usePostUsers = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postUsers>>,
    TError,
    { data: LocalSignUpRequestDto },
    TContext
  >;
}) => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postUsers>>,
    { data: LocalSignUpRequestDto }
  > = (props) => {
    const { data } = props ?? {};

    return postUsers(data);
  };

  return useMutation<
    Awaited<ReturnType<typeof postUsers>>,
    TError,
    { data: LocalSignUpRequestDto },
    TContext
  >(mutationFn, mutationOptions);
};
