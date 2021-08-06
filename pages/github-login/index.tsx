import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getMyUserDataApi } from '../../utils/queryAPI';
import { useQuery } from 'react-query';
import SelectModal from '../../components/github-login/selectModal';
import { Backdrop, Button, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { Flip, toast } from 'react-toastify';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.modal + 1,
      color: '#fff',
    },
  })
);

const githubLogin = () => {
  const router = useRouter();
  const { code } = router.query;
  const { refetch } = useQuery(getMyUserDataApi.key, getMyUserDataApi.apiCall);
  const githubUserData = useRef(null);

  //backdrop 시작 ----------
  const classes = useStyles();
  const [backDropOpen, setBackDropOpen] = useState(false);
  //backdrop 끝 ------------

  // 모달 설정 시작 ------
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  //모달창에서 포지션을 선택한 경우
  const handleClose = (selectedValue: string) => {
    setBackDropOpen(true);
    let convertedString = '';
    if (selectedValue === 'Front-End Developper') {
      convertedString = 'Front-End';
    }
    if (selectedValue === 'Back-End Developper') {
      convertedString = 'Back-End';
    }
    if (selectedValue === 'Full-Stack Developper') {
      convertedString = 'Full-Stack';
    }
    reCallGitHubSignupApi(convertedString);
  };

  const reCallGitHubSignupApi = async (selectedValue: string) => {
    const data = {
      githubUserInfo: githubUserData.current,
      positionType: selectedValue,
    };

    const result = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/github-signup`, data, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch((err) => {
        alert(err.response.status === 400 ? '인증 실패(데이터가 유효하지않습니다)' : err.message);
      });

    // console.log(result);

    if (result?.token) {
      const gitLogin = await axios
        .post(
          '/api/gitLogin',
          { token: result.token },
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data)
        .catch((err) => console.log(err.message));

      refetch();

      toast.info(`${result.user.loginID}님 반갑습니다!`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });
      router.push('/');
    } else {
      console.log('토큰이 없습니다.');
      router.push('/login');
    }
  };
  // 모달 설정 끝 -------

  const gitApi = async (code: string | string[] | undefined) => {
    const data = {
      code,
    };

    const result = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/github-info`, data, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch((err) => console.log(err.message));

    // console.log(result.githubUserData);

    if (result?.isSignUpUser === false) {
      githubUserData.current = result.githubUserData;
      setModalOpen(true);
      // 가입한적 없는 유저라면 모달창을 띄워야한다. 그뒤에 로직들도 실행 하지 않음.
      return;
    }

    if (result?.token) {
      const gitLogin = await axios
        .post(
          '/api/gitLogin',
          { token: result.token },
          {
            withCredentials: true,
          }
        )
        .then((res) => res.data)
        .catch((err) => console.log(err.message));

      refetch();

      toast.info(`${result.githubUserData.loginID}님 반갑습니다!`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });
      // console.log('깃허브 로그인 성공');
      router.push('/');
    } else {
      console.log('토큰이 유효하지 않습니다. 다시 로그인을 시도해 주세요.');
      toast.error(`토큰이 유효하지 않습니다. 다시 로그인을 시도해 주세요.`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });

      const logoutResult = await axios
        .get('/api/logout')
        .then((res) => res)
        .catch((err) => err);
      console.log('로그아웃을 시도하여 토큰을 제거합니다 : ', logoutResult);

      router.push('/login');
    }
  };

  useEffect(() => {
    // const { code } = router.query;

    if (code) {
      // console.log(code);
      gitApi(code);
    }
  }, [code]);

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '81vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CircularProgress />
        <div>
          <SelectModal selectedValue={selectedValue} open={modalOpen} onClose={handleClose} />
        </div>
        <Backdrop className={classes.backdrop} open={backDropOpen}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
};

export default githubLogin;
