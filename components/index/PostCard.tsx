import React, { MouseEventHandler, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import { Chip, Tooltip } from '@material-ui/core';

import clsx from 'clsx';
import dayjs from 'dayjs';
import removeMD from 'remove-markdown';

import { IAllPostInfoType } from 'types/AllPostInfoType';
import { useGetUsers } from 'stores/remoteStore/endpoints/user/user';
import { useStyles } from './PostCard.style';

type PostCardProps = {
  postInfo: IAllPostInfoType;
};

const PostCard = ({ postInfo }: PostCardProps) => {
  const classes = useStyles();
  const router = useRouter();

  const [expanded, setExpanded] = useState(false);

  const { data: myUserData } = useGetUsers();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const goToUserBlog: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (router) {
      router.push(`blog/${postInfo.User.loginID}`);
    }
  };

  return (
    <Card className={classes.root}>
      <Link
        href={`/blog/${postInfo.User.loginID}/${postInfo.id}`}
        as={`/blog/${postInfo.User.loginID}/${postInfo.id}`}
        key={`postcard-${postInfo.id}`}
      >
        <a>
          <CardHeader
            className={classes.cardHeaderTitle}
            avatar={
              <IconButton onClick={goToUserBlog}>
                <Tooltip
                  title={`${postInfo.User.loginID || ''}'s blog`}
                  arrow
                  placement="top"
                >
                  <Avatar
                    src={`${postInfo.User.avatarUrl || ''}`}
                    alt={`${postInfo.User.loginID || ''}`}
                    aria-label="profile-image"
                    className={classes.avatar}
                  />
                </Tooltip>
              </IconButton>
            }
            title={`${postInfo.title}`}
            subheader={`${postInfo.User.loginID}`}
          />

          <CardActionArea title={`${postInfo.title}`}>
            <CardMedia
              className={classes.media}
              image={`${process.env.NEXT_PUBLIC_API_URL}/${postInfo.thumbnail}`}
              title={`${postInfo.title}`}
            />
            <CardContent className={classes.postContent}>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                gutterBottom
              >
                {removeMD(postInfo.content.slice(0, 300)).replaceAll('\n', ' ')}
              </Typography>
              <Typography variant="caption">
                {`${dayjs(postInfo.updatedAt).format('YYYY년 M월 D일')} • 댓글 0개`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </a>
      </Link>

      <CardActions disableSpacing className={classes.actionIcons}>
        <IconButton aria-label="Like count" className="actionIcon">
          <ThumbUpIcon
            color={
              postInfo.LikeDisLike.filter(
                (like) => like.actionType === 'Like'
              ).filter((like) => like.UserId === myUserData?.id).length !== 0
                ? 'action'
                : 'disabled'
            }
          />
        </IconButton>

        <span>
          {postInfo.LikeDisLike.filter((like) => like.actionType === 'Like').length}
        </span>

        <IconButton aria-label="DisLike count" className="actionIcon">
          <ThumbDownIcon
            color={
              postInfo.LikeDisLike.filter(
                (dislike) => dislike.actionType === 'DisLike'
              ).filter((dislike) => dislike.UserId === myUserData?.id).length !== 0
                ? 'action'
                : 'disabled'
            }
          />
        </IconButton>

        <span>
          {
            postInfo.LikeDisLike.filter(
              (dislike) => dislike.actionType === 'DisLike'
            ).length
          }
        </span>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div className={classes.tagList}>
            {postInfo &&
              postInfo.Tags.map((item, idx) => (
                <div key={item.tagName + idx}>
                  <Chip
                    size="small"
                    label={item.tagName}
                    clickable
                    color="primary"
                    variant="outlined"
                  />
                </div>
              ))}
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PostCard;
