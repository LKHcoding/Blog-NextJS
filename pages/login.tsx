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
import { useQuery } from 'react-query';
import { getMyUserDataApi } from '../utils/queryAPI';
import GitHubIcon from '@material-ui/icons/GitHub';

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
    margin: theme.spacing(0, 0, 2),
  },
  github: {
    margin: theme.spacing(2, 0, 2),
  },
}));

const LogIn = () => {
  const router = useRouter();

  const { data, isLoading, isError, error, refetch } = useQuery(
    getMyUserDataApi.key,
    getMyUserDataApi.apiCall
  );

  const [loginID, onChangeLoginID] = useInput('test4');
  const [password, onChangePassword] = useInput('test4');

  // const { data, mutate, revalidate } = useSWR(`/api/users`, getFetcher);

  const classes = useStyles();

  const handleLogInFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(
          `/api/login`,
          { loginID, password },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          // console.log('response : ', response.data.data);
          refetch();
          // if (response.data.data === '로그인 성공') {
          //   router.push('/');
          // }
        })
        .catch((error) => {
          console.log(error);
          // setLogInError(error.response?.data?.statusCode === 401);
        });
    },
    [loginID, password]
  );

  // 깃허브 로그인
  const handleGithubLogin = useCallback(() => {
    const CLIENT_ID = 'b8a44b2b988a36fd9f9e';
    const REDIRECT_URL = 'http://localhost:3031/github-login';

    // OAuth app을 등록할때 작성했던 redirect url과 발급받은 CLIENT_ID를 바탕으로 URL을 생성합니다.
    const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`;

    // window.open(url);
    location.href = url;
  }, []);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러 메세지 : {error}</div>;
  }

  // console.log(data);
  if (data) {
    // return <Link href="/" />;
    console.log(data);
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
            fullWidth
            id="loginID"
            label="Login ID"
            name="loginID"
            autoComplete="loginID"
            autoFocus
            value={loginID}
            onChange={onChangeLoginID}
          />
          <TextField
            variant="outlined"
            margin="normal"
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
            fullWidth
            variant="outlined"
            className={classes.github}
            onClick={handleGithubLogin}>
            <GitHubIcon fontSize="small" />
            <div style={{ marginLeft: '5px' }}>github login</div>
          </Button>
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
                  비밀번호 찾기
                </MaterialLink>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/">
                <MaterialLink href="/" variant="body2">
                  {'회원가입'}
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
