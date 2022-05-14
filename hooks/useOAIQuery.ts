import { OAIMethodPathKeys, OAIParameters, OAIResponse } from '../types/typeWithGeneratedApi';
import { useQuery, UseQueryOptions } from 'react-query';
import { O } from 'ts-toolbelt';

const BASE_URL = 'https://develogger.kro.kr';
export const getRequestUrl = (queryKey: string, variables?: Record<string, unknown>) => {
  let url = `${BASE_URL}${queryKey}`;

  const paramKeys = (queryKey.match(/{[a-zA-z-]+}/g) ?? []).map((param) =>
    param.replace(/[{}]/g, '')
  );
  paramKeys.forEach((param) => {
    url = url.replace(`{${param}}`, variables?.[param] as string);
  });

  const qs = new URLSearchParams(
    Object.entries(variables ?? {}).reduce((current, [key, value]) => {
      if (paramKeys.includes(key)) {
        return current;
      }

      return {
        ...current,
        [key]: value,
      };
    }, {})
  ).toString();

  if (qs) {
    url = `${url}?${qs}`;
  }

  return url;
};

export function useOAIQuery<
  TQueryKey extends OAIMethodPathKeys<'get'>,
  TVariables extends OAIParameters<TQueryKey, 'get'>,
  TData extends OAIResponse<TQueryKey, 'get'>
>({
  queryKey,
  queryOptions,
  variables,
}: {
  queryKey: TQueryKey;
  queryOptions?: Omit<
    UseQueryOptions<TData, unknown, TData, (Record<string, unknown> | TQueryKey | undefined)[]>,
    'queryKey' | 'queryFn'
  >;
} & (TVariables extends undefined
  ? {
      variables?: undefined;
    }
  : O.RequiredKeys<NonNullable<TVariables>> extends never
  ? {
      variables?: TVariables;
    }
  : {
      variables: TVariables;
    })) {
  return useQuery(
    [queryKey, variables],
    async ({ signal }) => {
      const response = await fetch(getRequestUrl(queryKey, variables), {
        signal,
      });

      if (!response.ok) {
        throw new Error('Response error');
      }

      return (await response.json()) as TData;
    },
    queryOptions
  );
}
