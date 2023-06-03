import React from 'react';
import { useRouter } from 'next/router';

import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import TextField from '@material-ui/core/TextField';

import clsx from 'clsx';
import toast from 'utils/toast';
import { useImmerRef } from 'use-immer-ref';
import { useQueryClient } from '@tanstack/react-query';

import githubLogin from 'utils/githubLogin';
import { useStyles } from './CommentInput.style';
import { useGetUsers } from 'stores/remoteStore/endpoints/user/user';
import {
  getGetBlogCommentPostIdQueryKey,
  usePostBlogComment,
} from 'stores/remoteStore/endpoints/blog/blog';

const CommentInput = () => {
  const classes = useStyles();
  const router = useRouter();
  const [state, setState] = useImmerRef({
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
        disabled={!isLoggedIn}
        className={clsx(classes.root, !isLoggedIn && classes.unAuthedContainer)}
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
