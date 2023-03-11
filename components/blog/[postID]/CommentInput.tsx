import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useGetUsers } from '../../../stores/remoteStore/endpoints/user/user';
import githubLogin from '../../../utils/githubLogin';
import { useRouter } from 'next/router';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      marginTop: '50px',
      marginBottom: '20px',
    },
  })
);

const CommentInput = () => {
  const classes = useStyles();
  const router = useRouter();

  const { data } = useGetUsers();

  const isLoggedIn = !!data;

  return (
    <TextField
      className={classes.root}
      disabled={!isLoggedIn}
      onClick={() => {
        if (!isLoggedIn) {
          githubLogin({
            post: {
              blogUserId: router.query.BlogUserId as string,
              postId: router.query.postId as string,
            },
          });
        }
      }}
      // id="outlined-multiline-static"
      label={isLoggedIn ? '댓글' : '댓글을 작성하려면 여기를 클릭해 로그인 해주세요.'}
      multiline
      rows={5}
      defaultValue={''}
      placeholder={'댓글을 작성해주세요'}
      variant="outlined"
    />
  );
};

export default CommentInput;
