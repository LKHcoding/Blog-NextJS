import React, { Fragment } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useGetBlogCommentPostId } from '../../stores/remoteStore/endpoints/blog/blog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '100px',
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  })
);

type CommentListProps = {
  postId: string;
};

const CommentList = ({ postId }: CommentListProps) => {
  const classes = useStyles();

  const { data } = useGetBlogCommentPostId(postId);

  if (!data || (data?.length ?? 0) < 1) {
    return null;
  }
  return (
    <List className={classes.root}>
      {data.map((item) => {
        return (
          <Fragment key={item.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={item.User.loginID} src={item.User.avatarUrl} />
              </ListItemAvatar>
              <ListItemText
                primary={item.User.loginID}
                secondary={
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary">
                    {item.content}
                  </Typography>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Fragment>
        );
      })}
    </List>
  );
};

export default CommentList;
