import React, { FC, useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useQuery } from 'react-query';
import { getMyUserDataApi, getOneUserPostInfoDataApi } from '../../utils/queryAPI';
import removeMD from 'remove-markdown';
import Link from 'next/link';
import { Chip, createStyles, Theme } from '@material-ui/core';
import { PostListStyle } from '../../styles/muiStyles/components/blog/PostListStyle';
import dayjs from 'dayjs';
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface Props {
  params: {
    BlogUserId: string;
  };
  tag: string | null;
}

const PostList: FC<Props> = ({ params, tag }) => {
  const classes = PostListStyle();

  // console.log(tag);

  const { data, refetch } = useQuery(`${getOneUserPostInfoDataApi.key}-${params.BlogUserId}`, () =>
    getOneUserPostInfoDataApi.apiCall(params.BlogUserId, tag ? tag : 'all')
  );

  const { data: myUserData } = useQuery(getMyUserDataApi.key, getMyUserDataApi.apiCall);

  //순서 최신글이 위로 올라가게 정렬해주기
  data?.sort((a, b) => b.id - a.id);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (tag) {
      // console.log(tag);

      refetch();
    }
  }, [tag]);

  // if (!data) {
  //   return null;
  // }

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
                      <div>
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
                    {item.Tags.map((item, idx) => (
                      <div key={item.tagName + idx}>
                        <Chip
                          size="small"
                          label={item.tagName}
                          clickable
                          color="primary"
                          //  onDelete={handleDelete}
                          //  deleteIcon={<DoneIcon />}
                          variant={tag === item.tagName ? `default` : `outlined`}
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
