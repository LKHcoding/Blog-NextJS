import { O } from 'ts-toolbelt';

import { paths } from './generatedApi';

// 생성된 paths interface의 모든 키들의 type
export type OAIPathKeys = keyof paths;

// 주로 사용되는 api method들에 대한 type
export type OAIMethods = 'get' | 'put' | 'post' | 'delete' | 'patch';

// 특정 method가 존재하는 paths key들만 뽑기 위한 type
export type OAIMethodPathKeys<TMethod extends OAIMethods> = O.SelectKeys<
  paths,
  Record<TMethod, unknown>
>;

// 특정 paths, method에 해당되는 path parameters type (api params에 대한 type)
export type OAIPathParameters<TPath extends OAIPathKeys, TMethod extends OAIMethods> = O.Path<
  paths,
  [TPath, TMethod, 'parameters', 'path']
>;

// 특정 paths, method에 해당되는 query parameters type (api querystring에 대한 type)
export type OAIQueryParameters<TPath extends OAIPathKeys, TMethod extends OAIMethods> = O.Path<
  paths,
  [TPath, TMethod, 'parameters', 'query']
>;

// react-query의 variables로 params, querystring을 통합해서 받아서 사용하기 위한 type
export type OAIParameters<
  TPath extends OAIPathKeys,
  TMethod extends OAIMethods
> = OAIPathParameters<TPath, TMethod> extends Record<string, unknown>
  ? OAIQueryParameters<TPath, TMethod> extends Record<string, unknown>
    ? O.Merge<OAIPathParameters<TPath, TMethod>, OAIQueryParameters<TPath, TMethod>>
    : OAIPathParameters<TPath, TMethod>
  : OAIQueryParameters<TPath, TMethod> extends Record<string, unknown>
  ? OAIQueryParameters<TPath, TMethod>
  : undefined;

// 특정 path, method의 statusCode 200에 대한 response type
export type OAIResponse<TPath extends keyof paths, TMethod extends OAIMethods> = O.Path<
  paths,
  // 아래의 path는 주어진 OpenApi Specs에 따라서 달라질 수 있습니다.
  [TPath, TMethod, 'responses', 200, 'content', 'application/json']
>;
