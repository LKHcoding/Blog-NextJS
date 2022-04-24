import React, { useCallback } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link as MaterialLink } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import useInput from '../hooks/useInput';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getMyUserDataApi } from '../utils/queryAPI';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Flip, toast } from 'react-toastify';
import CircularProgress from '@material-ui/core/CircularProgress';
import Head from 'next/head';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '120px',
    minHeight: '500px',
    height: '80vh',
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
    margin: theme.spacing(2, 0, 2),
  },
  github: {
    margin: theme.spacing(0, 0, 2),
  },
}));

const LogIn = () => {
  const router = useRouter();

  const { data, isLoading, isError, error, refetch } = useQuery(
    getMyUserDataApi.key,
    getMyUserDataApi.apiCall
  );

  const [loginID, onChangeLoginID] = useInput('');
  const [password, onChangePassword] = useInput('');

  const classes = useStyles();

  const handleLogInFormSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (loginID === '' || password === '') {
      toast.error(`아이디 또는 비밀번호를 입력 해 주세요.`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });
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

    // console.dir(result);

    if (result?.data) {
      toast.info(`${result.data.loginID}님 반갑습니다!`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });
      refetch();
    }

    // 에러 메세지 띄워주기
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
      toast.error(`${errMessage}`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
        // onClick: () => {
        //   router.push('/');
        // },
      });
    }
  };

  // 깃허브 로그인
  const handleGithubLogin = useCallback(() => {
    const CLIENT_ID = '2ac09ec024b6ae7e47eb';
    const REDIRECT_URL = `${process.env.NEXT_PUBLIC_LOCAL_URL}/github-login`;
    //http://localhost:3031/github-login

    // OAuth app을 등록할때 작성했던 redirect url과 발급받은 CLIENT_ID를 바탕으로 URL을 생성합니다.
    const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`;

    // window.open(url);
    location.href = url;
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          width: '100%',
          height: '81vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return <div>에러 메세지 : {error}</div>;
  }

  // console.log(data);
  if (data) {
    router.push('/');
    return (
      <>
        <Head>
          <title>{`Login - Develogger`}</title>
        </Head>
        <div
          style={{
            width: '100%',
            minHeight: '500px',
            height: '85vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '2rem',
          }}>
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
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              LogIn
            </Button>
            <Button
              fullWidth
              variant="outlined"
              className={classes.github}
              onClick={handleGithubLogin}>
              <GitHubIcon fontSize="small" />
              <div style={{ marginLeft: '5px' }}>github login</div>
            </Button>

            <Grid container>
              <Grid item xs>
                {/* <Link href="/"> */}
                <MaterialLink
                  href="#"
                  variant="body2"
                  onClick={() => alert('현재 Github Login만 사용 가능합니다.')}>
                  비밀번호 찾기
                </MaterialLink>
                {/* </Link> */}
              </Grid>
              <Grid item>
                {/* <Link href="/"> */}
                <MaterialLink
                  href="#"
                  variant="body2"
                  onClick={() => alert('현재 Github Login만 사용 가능합니다.')}>
                  {'회원가입'}
                </MaterialLink>
                {/* </Link> */}
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default LogIn;
