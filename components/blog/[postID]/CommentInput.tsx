import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useGetUsers } from '../../../stores/remoteStore/endpoints/user/user';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // '& .MuiTextField-root': {
      //   margin: theme.spacing(1),
      //   width: '25ch',
      // },

      width: '100%',
      marginTop: '50px',
      marginBottom: '20px',
    },
  })
);

type CommentInputProps = {};

const CommentInput = (props: CommentInputProps) => {
  const classes = useStyles();

  const { data, isStale, isFetching } = useGetUsers();

  if (!data) {
    return null;
  }

  return (
    <TextField
      className={classes.root}
      // id="outlined-multiline-static"
      label="댓글"
      multiline
      rows={5}
      defaultValue={''}
      placeholder={'댓글을 작성해주세요'}
      variant="outlined"
    />
  );
};

export default CommentInput;
