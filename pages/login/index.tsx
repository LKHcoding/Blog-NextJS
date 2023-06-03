import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GitHubIcon from '@material-ui/icons/GitHub';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Link as MaterialLink } from '@material-ui/core';

import githubLogin from 'utils/githubLogin';
import toast from 'utils/toast';
import useInput from 'hooks/useInput';
import { useGetUsers } from 'stores/remoteStore/endpoints/user/user';
import { useStyles } from './login.style';

const LogIn = () => {
  const classes = useStyles();
  const router = useRouter();

  const { data, isLoading, refetch } = useGetUsers();

  const [loginID, onChangeLoginID] = useInput('');
  const [password, onChangePassword] = useInput('');

  const handleLogInFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    if (loginID === '' || password === '') {
      toast.error(`아이디 또는 비밀번호를 입력 해 주세요.`);
      return;
    }

    const result = await axios
      .post(
        `/api/login`,
        { loginID, password },
        {
          withCredentials: true,
        }
      )
      .then((res) => res)
      .catch((err) => err);

    if (result?.data) {
      toast.info(`${result.data.loginID}님 반갑습니다!`);
      refetch();
    }

    if (result?.response) {
      let errMessage = '';
      const isMessageArray = Array.isArray(result.response.data.message);
      if (isMessageArray && result.response.data.message.length > 1) {
        result.response.data.message.forEach((str: string, idx: number) => {
          errMessage += `[${idx + 1}]` + str + '\n';
        });
      } else {
        errMessage = result.response.data.message;
      }
      toast.error(`${errMessage}`);
    }
  };

  if (isLoading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (data) {
    router.push('/');
    return (
      <>
        <Head>
          <title>{`Login - Develogger`}</title>
        </Head>
        <div className={classes.inaccessibleContainer}>
          이미 로그인 한 유저는 접근 할 수 없습니다.
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{`Login - Develogger`}</title>
      </Head>
      <Container component="main" maxWidth="xs">
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
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              LogIn
            </Button>
            <Button
              fullWidth
              variant="outlined"
              className={classes.githubLoginButton}
              onClick={() => githubLogin()}
            >
              <GitHubIcon fontSize="small" />
              <div className={classes.githubLoginText}>github login</div>
            </Button>

            <Grid container>
              <Grid item xs>
                <MaterialLink
                  href="#"
                  variant="body2"
                  onClick={() => toast.error('현재 Github Login만 사용 가능합니다.')}
                >
                  비밀번호 찾기
                </MaterialLink>
              </Grid>
              <Grid item>
                <MaterialLink
                  href="#"
                  variant="body2"
                  onClick={() => toast.error('현재 Github Login만 사용 가능합니다.')}
                >
                  {'회원가입'}
                </MaterialLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default LogIn;
