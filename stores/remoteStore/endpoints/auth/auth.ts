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
import type { AuthLoginRequestDto, GithubCodeDto, GithubSignUpDto } from '../../model';
import { customAxios } from '../../mutator/customAxios';
import type { ErrorType } from '../../mutator/customAxios';

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

/**
 * @summary 로그인
 */
export const postAuthLogin = (authLoginRequestDto: AuthLoginRequestDto) => {
  return customAxios<void>({
    url: `/v1/auth/login`,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: authLoginRequestDto,
  });
};

export type PostAuthLoginMutationResult = NonNullable<Awaited<ReturnType<typeof postAuthLogin>>>;
export type PostAuthLoginMutationBody = AuthLoginRequestDto;
export type PostAuthLoginMutationError = ErrorType<unknown>;

export const usePostAuthLogin = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postAuthLogin>>,
    TError,
    { data: AuthLoginRequestDto },
    TContext
  >;
}) => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postAuthLogin>>,
    { data: AuthLoginRequestDto }
  > = (props) => {
    const { data } = props ?? {};

    return postAuthLogin(data);
  };

  return useMutation<
    Awaited<ReturnType<typeof postAuthLogin>>,
    TError,
    { data: AuthLoginRequestDto },
    TContext
  >(mutationFn, mutationOptions);
};
/**
 * @summary Swaggar 전용 Login
 */
export const postAuthSwaggarLogin = (authLoginRequestDto: AuthLoginRequestDto) => {
  return customAxios<void>({
    url: `/v1/auth/swaggarLogin`,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: authLoginRequestDto,
  });
};

export type PostAuthSwaggarLoginMutationResult = NonNullable<
  Awaited<ReturnType<typeof postAuthSwaggarLogin>>
>;
export type PostAuthSwaggarLoginMutationBody = AuthLoginRequestDto;
export type PostAuthSwaggarLoginMutationError = ErrorType<unknown>;

export const usePostAuthSwaggarLogin = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postAuthSwaggarLogin>>,
    TError,
    { data: AuthLoginRequestDto },
    TContext
  >;
}) => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postAuthSwaggarLogin>>,
    { data: AuthLoginRequestDto }
  > = (props) => {
    const { data } = props ?? {};

    return postAuthSwaggarLogin(data);
  };

  return useMutation<
    Awaited<ReturnType<typeof postAuthSwaggarLogin>>,
    TError,
    { data: AuthLoginRequestDto },
    TContext
  >(mutationFn, mutationOptions);
};
export const getAuthProtected = (signal?: AbortSignal) => {
  return customAxios<void>({ url: `/v1/auth/protected`, method: 'get', signal });
};

export const getGetAuthProtectedQueryKey = () => [`/v1/auth/protected`];

export type GetAuthProtectedQueryResult = NonNullable<Awaited<ReturnType<typeof getAuthProtected>>>;
export type GetAuthProtectedQueryError = ErrorType<unknown>;

export const useGetAuthProtected = <
  TData = Awaited<ReturnType<typeof getAuthProtected>>,
  TError = ErrorType<unknown>
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getAuthProtected>>, TError, TData>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetAuthProtectedQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getAuthProtected>>> = ({ signal }) =>
    getAuthProtected(signal);

  const query = useQuery<Awaited<ReturnType<typeof getAuthProtected>>, TError, TData>(
    queryKey,
    queryFn,
    queryOptions
  ) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};

/**
 * @summary 로그아웃
 */
export const postAuthLogout = () => {
  return customAxios<void>({ url: `/v1/auth/logout`, method: 'post' });
};

export type PostAuthLogoutMutationResult = NonNullable<Awaited<ReturnType<typeof postAuthLogout>>>;

export type PostAuthLogoutMutationError = ErrorType<unknown>;

export const usePostAuthLogout = <
  TError = ErrorType<unknown>,
  TVariables = void,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postAuthLogout>>,
    TError,
    TVariables,
    TContext
  >;
}) => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postAuthLogout>>,
    TVariables
  > = () => {
    return postAuthLogout();
  };

  return useMutation<Awaited<ReturnType<typeof postAuthLogout>>, TError, TVariables, TContext>(
    mutationFn,
    mutationOptions
  );
};
export const postAuthGithubInfo = (githubCodeDto: GithubCodeDto) => {
  return customAxios<void>({
    url: `/v1/auth/github-info`,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: githubCodeDto,
  });
};

export type PostAuthGithubInfoMutationResult = NonNullable<
  Awaited<ReturnType<typeof postAuthGithubInfo>>
>;
export type PostAuthGithubInfoMutationBody = GithubCodeDto;
export type PostAuthGithubInfoMutationError = ErrorType<unknown>;

export const usePostAuthGithubInfo = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postAuthGithubInfo>>,
    TError,
    { data: GithubCodeDto },
    TContext
  >;
}) => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postAuthGithubInfo>>,
    { data: GithubCodeDto }
  > = (props) => {
    const { data } = props ?? {};

    return postAuthGithubInfo(data);
  };

  return useMutation<
    Awaited<ReturnType<typeof postAuthGithubInfo>>,
    TError,
    { data: GithubCodeDto },
    TContext
  >(mutationFn, mutationOptions);
};
export const postAuthGithubSignup = (githubSignUpDto: GithubSignUpDto) => {
  return customAxios<void>({
    url: `/v1/auth/github-signup`,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: githubSignUpDto,
  });
};

export type PostAuthGithubSignupMutationResult = NonNullable<
  Awaited<ReturnType<typeof postAuthGithubSignup>>
>;
export type PostAuthGithubSignupMutationBody = GithubSignUpDto;
export type PostAuthGithubSignupMutationError = ErrorType<unknown>;

export const usePostAuthGithubSignup = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postAuthGithubSignup>>,
    TError,
    { data: GithubSignUpDto },
    TContext
  >;
}) => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postAuthGithubSignup>>,
    { data: GithubSignUpDto }
  > = (props) => {
    const { data } = props ?? {};

    return postAuthGithubSignup(data);
  };

  return useMutation<
    Awaited<ReturnType<typeof postAuthGithubSignup>>,
    TError,
    { data: GithubSignUpDto },
    TContext
  >(mutationFn, mutationOptions);
};
