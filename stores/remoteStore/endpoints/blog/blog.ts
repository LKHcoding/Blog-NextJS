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
import type {
  CreateBlogPostDto,
  UpdateBlogPostDto,
  BlogPosts,
  BlogPostsComment,
  CreateBlogCommentDto,
} from '../../model';
import { customAxios } from '../../mutator/customAxios';
import type { ErrorType } from '../../mutator/customAxios';

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

export const postBlogImage = () => {
  return customAxios<void>({ url: `/v1/blog/image`, method: 'post' });
};

export type PostBlogImageMutationResult = NonNullable<Awaited<ReturnType<typeof postBlogImage>>>;

export type PostBlogImageMutationError = ErrorType<unknown>;

export const usePostBlogImage = <
  TError = ErrorType<unknown>,
  TVariables = void,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postBlogImage>>,
    TError,
    TVariables,
    TContext
  >;
}) => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postBlogImage>>,
    TVariables
  > = () => {
    return postBlogImage();
  };

  return useMutation<Awaited<ReturnType<typeof postBlogImage>>, TError, TVariables, TContext>(
    mutationFn,
    mutationOptions
  );
};
export const postBlog = (createBlogPostDto: CreateBlogPostDto) => {
  return customAxios<void>({
    url: `/v1/blog`,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: createBlogPostDto,
  });
};

export type PostBlogMutationResult = NonNullable<Awaited<ReturnType<typeof postBlog>>>;
export type PostBlogMutationBody = CreateBlogPostDto;
export type PostBlogMutationError = ErrorType<unknown>;

export const usePostBlog = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postBlog>>,
    TError,
    { data: CreateBlogPostDto },
    TContext
  >;
}) => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postBlog>>,
    { data: CreateBlogPostDto }
  > = (props) => {
    const { data } = props ?? {};

    return postBlog(data);
  };

  return useMutation<
    Awaited<ReturnType<typeof postBlog>>,
    TError,
    { data: CreateBlogPostDto },
    TContext
  >(mutationFn, mutationOptions);
};
export const postBlogUpdatePost = (updateBlogPostDto: UpdateBlogPostDto) => {
  return customAxios<void>({
    url: `/v1/blog/update-post`,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: updateBlogPostDto,
  });
};

export type PostBlogUpdatePostMutationResult = NonNullable<
  Awaited<ReturnType<typeof postBlogUpdatePost>>
>;
export type PostBlogUpdatePostMutationBody = UpdateBlogPostDto;
export type PostBlogUpdatePostMutationError = ErrorType<unknown>;

export const usePostBlogUpdatePost = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postBlogUpdatePost>>,
    TError,
    { data: UpdateBlogPostDto },
    TContext
  >;
}) => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postBlogUpdatePost>>,
    { data: UpdateBlogPostDto }
  > = (props) => {
    const { data } = props ?? {};

    return postBlogUpdatePost(data);
  };

  return useMutation<
    Awaited<ReturnType<typeof postBlogUpdatePost>>,
    TError,
    { data: UpdateBlogPostDto },
    TContext
  >(mutationFn, mutationOptions);
};
export const deleteBlogDeletePostPostId = (postId: string) => {
  return customAxios<void>({ url: `/v1/blog/delete-post/${postId}`, method: 'delete' });
};

export type DeleteBlogDeletePostPostIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteBlogDeletePostPostId>>
>;

export type DeleteBlogDeletePostPostIdMutationError = ErrorType<unknown>;

export const useDeleteBlogDeletePostPostId = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteBlogDeletePostPostId>>,
    TError,
    { postId: string },
    TContext
  >;
}) => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteBlogDeletePostPostId>>,
    { postId: string }
  > = (props) => {
    const { postId } = props ?? {};

    return deleteBlogDeletePostPostId(postId);
  };

  return useMutation<
    Awaited<ReturnType<typeof deleteBlogDeletePostPostId>>,
    TError,
    { postId: string },
    TContext
  >(mutationFn, mutationOptions);
};
export const getBlogTagsInfo = (signal?: AbortSignal) => {
  return customAxios<void>({ url: `/v1/blog/tags-info`, method: 'get', signal });
};

export const getGetBlogTagsInfoQueryKey = () => [`/v1/blog/tags-info`];

export type GetBlogTagsInfoQueryResult = NonNullable<Awaited<ReturnType<typeof getBlogTagsInfo>>>;
export type GetBlogTagsInfoQueryError = ErrorType<unknown>;

export const useGetBlogTagsInfo = <
  TData = Awaited<ReturnType<typeof getBlogTagsInfo>>,
  TError = ErrorType<unknown>
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getBlogTagsInfo>>, TError, TData>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetBlogTagsInfoQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getBlogTagsInfo>>> = ({ signal }) =>
    getBlogTagsInfo(signal);

  const query = useQuery<Awaited<ReturnType<typeof getBlogTagsInfo>>, TError, TData>(
    queryKey,
    queryFn,
    queryOptions
  ) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};

export const getBlogTagsInfoUserID = (userID: string, signal?: AbortSignal) => {
  return customAxios<void>({ url: `/v1/blog/tags-info/${userID}`, method: 'get', signal });
};

export const getGetBlogTagsInfoUserIDQueryKey = (userID: string) => [
  `/v1/blog/tags-info/${userID}`,
];

export type GetBlogTagsInfoUserIDQueryResult = NonNullable<
  Awaited<ReturnType<typeof getBlogTagsInfoUserID>>
>;
export type GetBlogTagsInfoUserIDQueryError = ErrorType<unknown>;

export const useGetBlogTagsInfoUserID = <
  TData = Awaited<ReturnType<typeof getBlogTagsInfoUserID>>,
  TError = ErrorType<unknown>
>(
  userID: string,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getBlogTagsInfoUserID>>, TError, TData>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetBlogTagsInfoUserIDQueryKey(userID);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getBlogTagsInfoUserID>>> = ({ signal }) =>
    getBlogTagsInfoUserID(userID, signal);

  const query = useQuery<Awaited<ReturnType<typeof getBlogTagsInfoUserID>>, TError, TData>(
    queryKey,
    queryFn,
    { enabled: !!userID, ...queryOptions }
  ) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};

export const getBlogPostsInfoUserIDTag = (userID: string, tag: string, signal?: AbortSignal) => {
  return customAxios<void>({ url: `/v1/blog/posts-info/${userID}/${tag}`, method: 'get', signal });
};

export const getGetBlogPostsInfoUserIDTagQueryKey = (userID: string, tag: string) => [
  `/v1/blog/posts-info/${userID}/${tag}`,
];

export type GetBlogPostsInfoUserIDTagQueryResult = NonNullable<
  Awaited<ReturnType<typeof getBlogPostsInfoUserIDTag>>
>;
export type GetBlogPostsInfoUserIDTagQueryError = ErrorType<unknown>;

export const useGetBlogPostsInfoUserIDTag = <
  TData = Awaited<ReturnType<typeof getBlogPostsInfoUserIDTag>>,
  TError = ErrorType<unknown>
>(
  userID: string,
  tag: string,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getBlogPostsInfoUserIDTag>>, TError, TData>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetBlogPostsInfoUserIDTagQueryKey(userID, tag);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getBlogPostsInfoUserIDTag>>> = ({
    signal,
  }) => getBlogPostsInfoUserIDTag(userID, tag, signal);

  const query = useQuery<Awaited<ReturnType<typeof getBlogPostsInfoUserIDTag>>, TError, TData>(
    queryKey,
    queryFn,
    { enabled: !!(userID && tag), ...queryOptions }
  ) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};

export const getBlogPostInfoPostId = (postId: string, signal?: AbortSignal) => {
  return customAxios<BlogPosts>({ url: `/v1/blog/post-info/${postId}`, method: 'get', signal });
};

export const getGetBlogPostInfoPostIdQueryKey = (postId: string) => [
  `/v1/blog/post-info/${postId}`,
];

export type GetBlogPostInfoPostIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getBlogPostInfoPostId>>
>;
export type GetBlogPostInfoPostIdQueryError = ErrorType<unknown>;

export const useGetBlogPostInfoPostId = <
  TData = Awaited<ReturnType<typeof getBlogPostInfoPostId>>,
  TError = ErrorType<unknown>
>(
  postId: string,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getBlogPostInfoPostId>>, TError, TData>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetBlogPostInfoPostIdQueryKey(postId);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getBlogPostInfoPostId>>> = ({ signal }) =>
    getBlogPostInfoPostId(postId, signal);

  const query = useQuery<Awaited<ReturnType<typeof getBlogPostInfoPostId>>, TError, TData>(
    queryKey,
    queryFn,
    { enabled: !!postId, ...queryOptions }
  ) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};

export const postBlogPostLikePostIdActionType = (
  postId: string,
  actionType: 'Like' | 'DisLike'
) => {
  return customAxios<void>({ url: `/v1/blog/post-like/${postId}/${actionType}`, method: 'post' });
};

export type PostBlogPostLikePostIdActionTypeMutationResult = NonNullable<
  Awaited<ReturnType<typeof postBlogPostLikePostIdActionType>>
>;

export type PostBlogPostLikePostIdActionTypeMutationError = ErrorType<unknown>;

export const usePostBlogPostLikePostIdActionType = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postBlogPostLikePostIdActionType>>,
    TError,
    { postId: string; actionType: 'Like' | 'DisLike' },
    TContext
  >;
}) => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postBlogPostLikePostIdActionType>>,
    { postId: string; actionType: 'Like' | 'DisLike' }
  > = (props) => {
    const { postId, actionType } = props ?? {};

    return postBlogPostLikePostIdActionType(postId, actionType);
  };

  return useMutation<
    Awaited<ReturnType<typeof postBlogPostLikePostIdActionType>>,
    TError,
    { postId: string; actionType: 'Like' | 'DisLike' },
    TContext
  >(mutationFn, mutationOptions);
};
export const getBlogAllPostsInfo = (signal?: AbortSignal) => {
  return customAxios<void>({ url: `/v1/blog/all-posts-info`, method: 'get', signal });
};

export const getGetBlogAllPostsInfoQueryKey = () => [`/v1/blog/all-posts-info`];

export type GetBlogAllPostsInfoQueryResult = NonNullable<
  Awaited<ReturnType<typeof getBlogAllPostsInfo>>
>;
export type GetBlogAllPostsInfoQueryError = ErrorType<unknown>;

export const useGetBlogAllPostsInfo = <
  TData = Awaited<ReturnType<typeof getBlogAllPostsInfo>>,
  TError = ErrorType<unknown>
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getBlogAllPostsInfo>>, TError, TData>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetBlogAllPostsInfoQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getBlogAllPostsInfo>>> = ({ signal }) =>
    getBlogAllPostsInfo(signal);

  const query = useQuery<Awaited<ReturnType<typeof getBlogAllPostsInfo>>, TError, TData>(
    queryKey,
    queryFn,
    queryOptions
  ) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};

export const getBlogPostsInfoByTagUserIDTag = (
  userID: string,
  tag: string,
  signal?: AbortSignal
) => {
  return customAxios<void>({
    url: `/v1/blog/posts-info-byTag/${userID}/${tag}`,
    method: 'get',
    signal,
  });
};

export const getGetBlogPostsInfoByTagUserIDTagQueryKey = (userID: string, tag: string) => [
  `/v1/blog/posts-info-byTag/${userID}/${tag}`,
];

export type GetBlogPostsInfoByTagUserIDTagQueryResult = NonNullable<
  Awaited<ReturnType<typeof getBlogPostsInfoByTagUserIDTag>>
>;
export type GetBlogPostsInfoByTagUserIDTagQueryError = ErrorType<unknown>;

export const useGetBlogPostsInfoByTagUserIDTag = <
  TData = Awaited<ReturnType<typeof getBlogPostsInfoByTagUserIDTag>>,
  TError = ErrorType<unknown>
>(
  userID: string,
  tag: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getBlogPostsInfoByTagUserIDTag>>,
      TError,
      TData
    >;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetBlogPostsInfoByTagUserIDTagQueryKey(userID, tag);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getBlogPostsInfoByTagUserIDTag>>> = ({
    signal,
  }) => getBlogPostsInfoByTagUserIDTag(userID, tag, signal);

  const query = useQuery<Awaited<ReturnType<typeof getBlogPostsInfoByTagUserIDTag>>, TError, TData>(
    queryKey,
    queryFn,
    { enabled: !!(userID && tag), ...queryOptions }
  ) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};

/**
 * @summary 게시글 별 코멘트 리스트 조회
 */
export const getBlogCommentPostId = (postId: string, signal?: AbortSignal) => {
  return customAxios<BlogPostsComment[]>({
    url: `/v1/blog/comment/${postId}`,
    method: 'get',
    signal,
  });
};

export const getGetBlogCommentPostIdQueryKey = (postId: string) => [`/v1/blog/comment/${postId}`];

export type GetBlogCommentPostIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getBlogCommentPostId>>
>;
export type GetBlogCommentPostIdQueryError = ErrorType<unknown>;

export const useGetBlogCommentPostId = <
  TData = Awaited<ReturnType<typeof getBlogCommentPostId>>,
  TError = ErrorType<unknown>
>(
  postId: string,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getBlogCommentPostId>>, TError, TData>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetBlogCommentPostIdQueryKey(postId);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getBlogCommentPostId>>> = ({ signal }) =>
    getBlogCommentPostId(postId, signal);

  const query = useQuery<Awaited<ReturnType<typeof getBlogCommentPostId>>, TError, TData>(
    queryKey,
    queryFn,
    { enabled: !!postId, ...queryOptions }
  ) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};

/**
 * @summary 게시글 별 코멘트 작성
 */
export const postBlogComment = (createBlogCommentDto: CreateBlogCommentDto) => {
  return customAxios<BlogPostsComment>({
    url: `/v1/blog/comment`,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: createBlogCommentDto,
  });
};

export type PostBlogCommentMutationResult = NonNullable<
  Awaited<ReturnType<typeof postBlogComment>>
>;
export type PostBlogCommentMutationBody = CreateBlogCommentDto;
export type PostBlogCommentMutationError = ErrorType<unknown>;

export const usePostBlogComment = <TError = ErrorType<unknown>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postBlogComment>>,
    TError,
    { data: CreateBlogCommentDto },
    TContext
  >;
}) => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postBlogComment>>,
    { data: CreateBlogCommentDto }
  > = (props) => {
    const { data } = props ?? {};

    return postBlogComment(data);
  };

  return useMutation<
    Awaited<ReturnType<typeof postBlogComment>>,
    TError,
    { data: CreateBlogCommentDto },
    TContext
  >(mutationFn, mutationOptions);
};
