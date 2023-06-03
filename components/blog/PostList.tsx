import React, { FC, useEffect } from 'react';
import Link from 'next/link';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import { Chip, IconButton } from '@material-ui/core';

import dayjs from 'dayjs';
import removeMD from 'remove-markdown';
import { useQuery } from '@tanstack/react-query';

import useLoadingStore from 'stores/useLoadingStore';
import { getOneUserPostInfoDataApi } from 'utils/queryAPI';
import { PostListStyle } from 'components/blog/PostList.style';
import { useGetUsers } from 'stores/remoteStore/endpoints/user/user';

type PostListProps = {
  params: {
    BlogUserId: string;
  };
  tag: string | null;
};

const PostList: FC<PostListProps> = ({ params, tag }) => {
  const classes = PostListStyle();

  const setLoading = useLoadingStore((state) => state.setLoading);

  const { data, refetch, isFetching } = useQuery(
    [`${getOneUserPostInfoDataApi.key}-${params.BlogUserId}`],
    () => getOneUserPostInfoDataApi.apiCall(params.BlogUserId, tag ? tag : 'all')
  );
  data?.sort((a, b) => b.id - a.id);

  const { data: myUserData } = useGetUsers();

  useEffect(() => {
    if (tag) {
      refetch();
    }
  }, [tag]);

  useEffect(() => {
    setLoading(isFetching);
    return () => {
      // NOTE: 여기서 로딩중일때 다른페이지로 넘어가버려서 로딩바가 계속 유지되는 경우 방지
      setLoading(false);
    };
  }, [isFetching]);

  return (
    <div className={classes.root}>
      {data &&
        data.map((item) => (
          <Link
            href={`/blog/${params.BlogUserId}/${item.id}`}
            as={`/blog/${params.BlogUserId}/${item.id}`}
            key={item.id}
          >
            <a className={classes.linkContainer}>
              <Card className={classes.cardRoot}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={`${
                      process.env.NEXT_PUBLIC_API_URL
                    }/${item.thumbnail.replaceAll('\\', '/')}`}
                    title={`${item.title}`}
                  />

                  <CardContent>
                    <div className={classes.cardTitle}>
                      <Typography variant="h5" component="h2">
                        {item.title}
                      </Typography>

                      <div className={classes.thumbsContainer}>
                        {/* 좋아요 싫어요 영역 */}
                        <IconButton aria-label="Like count" className="actionIcon">
                          <ThumbUpIcon
                            color={
                              item.LikeDisLike.filter(
                                (like) => like.actionType === 'Like'
                              ).filter((like) => like.UserId === myUserData?.id)
                                .length !== 0
                                ? 'action'
                                : 'disabled'
                            }
                          />
                        </IconButton>
                        <span>
                          {
                            item.LikeDisLike.filter(
                              (like) => like.actionType === 'Like'
                            ).length
                          }
                        </span>
                        <IconButton
                          aria-label="DisLike count"
                          className="actionIcon"
                        >
                          <ThumbDownIcon
                            color={
                              item.LikeDisLike.filter(
                                (dislike) => dislike.actionType === 'DisLike'
                              ).filter(
                                (dislike) => dislike.UserId === myUserData?.id
                              ).length !== 0
                                ? 'action'
                                : 'disabled'
                            }
                          />
                        </IconButton>
                        <span>
                          {
                            item.LikeDisLike.filter(
                              (dislike) => dislike.actionType === 'DisLike'
                            ).length
                          }
                        </span>
                      </div>
                    </div>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {removeMD(item.content.slice(0, 250)).replaceAll('\n', ' ')}{' '}
                      ...
                    </Typography>

                    {/* 날짜, 댓글 수 영역 */}
                    <div className={classes.postInfoContainer}>
                      <Typography variant="caption">
                        {`${dayjs(item.updatedAt).format(
                          'YYYY년 M월 D일'
                        )} • 댓글 0개`}
                      </Typography>
                    </div>
                  </CardContent>
                  <div className={classes.tagList}>
                    {item.Tags.map((tagItem, idx) => (
                      <div key={item.id + tagItem.tagName + idx}>
                        <Chip
                          size="small"
                          label={tagItem.tagName}
                          clickable
                          color="primary"
                          variant={tag === tagItem.tagName ? `default` : `outlined`}
                        />
                      </div>
                    ))}
                  </div>
                </CardActionArea>
              </Card>
            </a>
          </Link>
        ))}
    </div>
  );
};

export default PostList;
