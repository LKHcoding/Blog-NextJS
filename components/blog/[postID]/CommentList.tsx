import React, { Fragment } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useGetBlogCommentPostId } from 'stores/remoteStore/endpoints/blog/blog';
import { useRouter } from 'next/router';
import toast from 'utils/toast';
import getPassedTimeString from 'utils/getPassedTimeString';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '100px',
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    avatarWrapper: {
      minWidth: 0,
    },
    avatar: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    userName: {
      '&:hover': {
        textDecoration: 'underline',
        cursor: 'pointer',
      },
    },
    updatedAt: {
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'end',
      marginLeft: '6px',
    },
  })
);

type CommentListProps = {
  postId: string;
};

const CommentList = ({ postId }: CommentListProps) => {
  const classes = useStyles();
  const router = useRouter();

  const { data } = useGetBlogCommentPostId(postId);

  const onClick = (blogUserId: string) => {
    if (!blogUserId) {
      toast.error('유저에 대한 정보가 없습니다.');
      return;
    }
    router.push(`/blog/${blogUserId}`);
  };

  if (!data || (data?.length ?? 0) < 1) {
    return null;
  }
  return (
    <List className={classes.root}>
      {data.map((item) => (
        <Fragment key={item.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar className={classes.avatarWrapper}>
              <Avatar
                className={classes.avatar}
                alt={item.User.loginID}
                src={item.User.avatarUrl}
                onClick={() => onClick(item.User.loginID)}
              />
            </ListItemAvatar>

            <ListItemText
              style={{ marginLeft: '16px' }}
              primary={
                <div className={classes.titleContainer}>
                  <div
                    className={classes.userName}
                    onClick={() => onClick(item.User.loginID)}
                  >
                    {`${item.User.loginID}`}
                  </div>

                  <Typography
                    variant="caption"
                    className={classes.updatedAt}
                    color={'textSecondary'}
                  >
                    {`- ${getPassedTimeString(item.updatedAt)}`}
                  </Typography>
                </div>
              }
              secondary={
                <Typography
                  component={'p'}
                  variant="body2"
                  style={{ whiteSpace: 'pre-line' }}
                  color="textPrimary"
                >
                  {item.content}
                </Typography>
              }
            />
          </ListItem>

          <Divider variant="inset" component="li" />
        </Fragment>
      ))}
    </List>
  );
};

export default CommentList;
