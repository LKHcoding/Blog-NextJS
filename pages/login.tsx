import React, { useCallback } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link as MaterialLink } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useSWR from 'swr';
import axios from 'axios';
import useInput from '../hooks/useInput';
import getFetcher from './../utils/getFetcher';
import Link from 'next/link';
import cookie, { CookieAttributes } from 'js-cookie';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LogIn = () => {
  const router = useRouter();

  const [email, onChangeEmail] = useInput('test4@gmail.com');
  const [password, onChangePassword] = useInput('test4');

  const { data, mutate, revalidate } = useSWR(`/api/users`, getFetcher);

  const classes = useStyles();

  const handleLogInFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // console.log('email : ', email);
      // console.log('password : ', password);
      axios
        .post(
          `/login`,
          { email, password },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log('response : ', response.data);
          //revalidate은 swr호출을 한번더시킨다.
          revalidate();
          //mutate는 요청을 다시보내지 않고 데이터를 넣는다.
          //optimistic ui (좋은 사용자 경험을 위해 2번째 인자 true주면 서버에 재확인 요청을 함)
          // mutate(response.data, false);
        })
        .catch((error) => {
          console.log(error);
          // setLogInError(error.response?.data?.statusCode === 401);
        });
    },
    [email, password]
  );

  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  console.log(data);
  if (data) {
    // return <Link href="/" />;
    router.push('/');
    return (
      <>
        <div>이미 로그인 한 유저입니다.</div>
      </>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          LogIn
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleLogInFormSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={onChangeEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={onChangePassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            LogIn
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/">
                <MaterialLink href="/" variant="body2">
                  Forgot password?
                </MaterialLink>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/">
                <MaterialLink href="/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </MaterialLink>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default LogIn;
