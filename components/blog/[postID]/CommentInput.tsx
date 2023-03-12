import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useGetUsers } from 'stores/remoteStore/endpoints/user/user';
import githubLogin from 'utils/githubLogin';
import { useRouter } from 'next/router';
import { useImmer } from 'use-immer';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import {
  getGetBlogCommentPostIdQueryKey,
  usePostBlogComment,
} from 'stores/remoteStore/endpoints/blog/blog';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'utils/toast';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    root: {
      width: '100%',
      marginTop: '50px',
      marginBottom: '20px',
    },
    buttonWrapper: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  })
);

const CommentInput = () => {
  const classes = useStyles();
  const router = useRouter();
  const [state, setState] = useImmer({
    input: '',
  });

  const queryClient = useQueryClient();

  const { mutateAsync } = usePostBlogComment();

  const { data } = useGetUsers();

  const blogUserId = router.query.BlogUserId as string;
  const postId = router.query.postId as string;

  const onClick = async () => {
    if (!state.input.trim()) {
      toast.error('댓글 내용을 입력해주세요.');
      return;
    }
    if (!isLoggedIn) {
      toast.error('로그인 후 작성 가능합니다.(어떻게 접근한거지..?)');
      return;
    }

    const result = await mutateAsync({
      data: {
        postId: +postId,
        content: state.input.trim(),
      },
    });
    if (result.content) {
      // 게시글 작성 성공
      await queryClient.resetQueries({
        queryKey: getGetBlogCommentPostIdQueryKey(postId),
        type: 'all',
      });
      toast.info('댓글이 작성되었습니다.');
      setState((dr) => {
        dr.input = '';
      });
    }
  };

  const isLoggedIn = !!data;

  return (
    <div className={classes.container}>
      <TextField
        value={state.input}
        onChange={(e) => {
          setState((dr) => {
            dr.input = e.target.value;
          });
        }}
        className={classes.root}
        disabled={!isLoggedIn}
        onClick={() => {
          if (!isLoggedIn) {
            githubLogin({
              post: {
                blogUserId,
                postId,
              },
            });
          }
        }}
        label={
          isLoggedIn
            ? '새로운 댓글'
            : '댓글을 작성하려면 여기를 클릭해 로그인 해주세요.'
        }
        multiline
        minRows={3}
        maxRows={7}
        placeholder={'댓글을 작성해주세요'}
        variant="outlined"
      />
      <div className={classes.buttonWrapper}>
        <Button
          variant="contained"
          color="primary"
          endIcon={<CreateIcon />}
          onClick={onClick}
          disabled={!isLoggedIn}
        >
          댓글 작성
        </Button>
      </div>
    </div>
  );
};

export default CommentInput;
