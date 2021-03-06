import React, { FC, useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useQuery } from 'react-query';
import { getMyUserDataApi, getOneUserPostInfoDataApi } from '../../utils/queryAPI';
import removeMD from 'remove-markdown';
import Link from 'next/link';
import { Chip } from '@material-ui/core';
import { PostListStyle } from '../../styles/muiStyles/components/blog/PostListStyle';
import dayjs from 'dayjs';
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import useLoadingStore from '../../stores/useLoadingStore';

interface Props {
  params: {
    BlogUserId: string;
  };
  tag: string | null;
}

const PostList: FC<Props> = ({ params, tag }) => {
  const classes = PostListStyle();

  // const isLoading = useLoadingStore((state) => state.isLoading);
  const setLoading = useLoadingStore((state) => state.setLoading);

  // console.log(tag);

  const { data, refetch, isFetching } = useQuery(
    `${getOneUserPostInfoDataApi.key}-${params.BlogUserId}`,
    () => getOneUserPostInfoDataApi.apiCall(params.BlogUserId, tag ? tag : 'all')
  );

  const { data: myUserData } = useQuery(getMyUserDataApi.key, getMyUserDataApi.apiCall);

  //순서 최신글이 위로 올라가게 정렬해주기
  data?.sort((a, b) => b.id - a.id);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // console.log(isFetching);

  useEffect(() => {
    if (tag) {
      refetch();
    }
  }, [tag]);

  useEffect(() => {
    setLoading(isFetching);
    return () => {
      // 여기서 로딩중일때 다른페이지로 넘어가버려서 로딩바가 계속
      // 유지되는 경우 방지
      setLoading(false);
    };
  }, [isFetching]);

  return (
    <div className={classes.root}>
      {data &&
        data.map((item) => (
          <Link
            // href={`/blog/[BlogUserId]/[postID]`}
            href={`/blog/${params.BlogUserId}/${item.id}`}
            as={`/blog/${params.BlogUserId}/${item.id}`}
            key={item.id}>
            <a className={classes.linkContainer}>
              <Card className={classes.cardRoot}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={`${process.env.NEXT_PUBLIC_API_URL}/${item.thumbnail.replaceAll(
                      '\\',
                      '/'
                    )}`}
                    title={`${item.title}`}
                  />
                  <CardContent>
                    <div className={classes.cardTitle}>
                      <Typography variant="h5" component="h2">
                        {item.title}
                      </Typography>
                      <div style={{ width: '112px', whiteSpace: 'nowrap' }}>
                        {/* 좋아요 싫어요 영역 */}
                        <IconButton aria-label="Like count" className="actionIcon">
                          <ThumbUpIcon
                            color={
                              item.LikeDisLike.filter((like) => like.actionType === 'Like').filter(
                                (like) => like.UserId === myUserData?.id
                              ).length !== 0
                                ? 'action'
                                : 'disabled'
                            }
                          />
                        </IconButton>
                        <span>
                          {item.LikeDisLike.filter((like) => like.actionType === 'Like').length}
                        </span>
                        <IconButton aria-label="DisLike count" className="actionIcon">
                          <ThumbDownIcon
                            color={
                              item.LikeDisLike.filter(
                                (dislike) => dislike.actionType === 'DisLike'
                              ).filter((dislike) => dislike.UserId === myUserData?.id).length !== 0
                                ? 'action'
                                : 'disabled'
                            }
                          />
                        </IconButton>
                        <span>
                          {
                            item.LikeDisLike.filter((dislike) => dislike.actionType === 'DisLike')
                              .length
                          }
                        </span>
                      </div>
                    </div>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {removeMD(item.content.slice(0, 250)).replaceAll('\n', ' ')} ...
                    </Typography>
                    {/* 날짜, 댓글 수 영역 */}
                    <div style={{ color: `rgba(0, 0, 0, 0.50)`, marginTop: '8px' }}>
                      <Typography variant="caption">
                        {`${dayjs(item.updatedAt).format('YYYY년 M월 D일')} • 댓글 0개`}
                      </Typography>
                    </div>
                  </CardContent>
                  <div
                    className={classes.tagList}
                    style={{
                      display: 'flex',
                      marginLeft: '12px',
                      marginRight: '12px',
                      marginBottom: '12px',
                    }}>
                    {item.Tags.map((tagItem, idx) => (
                      <div key={item.id + tagItem.tagName + idx}>
                        <Chip
                          size="small"
                          label={tagItem.tagName}
                          clickable
                          color="primary"
                          //  onDelete={handleDelete}
                          //  deleteIcon={<DoneIcon />}
                          variant={tag === tagItem.tagName ? `default` : `outlined`}
                          // variant="outlined"
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
