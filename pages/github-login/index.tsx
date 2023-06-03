import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { Backdrop } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';

import SelectModal from 'components/github-login/SelectModal';
import toast from 'utils/toast';
import { useGetUsers } from 'stores/remoteStore/endpoints/user/user';
import { useStyles } from './github-login.style';

const githubLogin = () => {
  const classes = useStyles();
  const router = useRouter();
  const { code, blogUserId, postId } = router.query;

  const { refetch } = useGetUsers();

  const githubUserData = useRef(null);
  const [backDropOpen, setBackDropOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedValue, _setSelectedValue] = useState('');

  const handleClose = (selectedValue: string) => {
    //모달창에서 포지션을 선택한 경우
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
        alert(
          err.response.status === 400
            ? '인증 실패(데이터가 유효하지않습니다)'
            : err.message
        );
      });

    if (result?.token) {
      await axios
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

      toast.info(`${result.user.loginID}님 반갑습니다!`);
      if (blogUserId && postId) {
        router.push(`blog/${blogUserId}/${postId}`);
        return;
      }
      router.push('/');
      return;
    }

    // 토큰이 없는 케이스 ( 로그인으로 보낸다 )
    router.push('/login');
  };

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

    if (result?.isSignUpUser === false) {
      githubUserData.current = result.githubUserData;
      setModalOpen(true);
      // 가입한적 없는 유저라면 모달창을 띄워야한다.
      return;
    }

    if (result?.token) {
      await axios
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

      toast.info(`${result.githubUserData.loginID}님 반갑습니다!`);

      if (blogUserId && postId) {
        router.push(`blog/${blogUserId}/${postId}`);
      } else {
        router.push('/');
      }
    } else {
      toast.error(`토큰이 유효하지 않습니다. 다시 로그인을 시도해 주세요.`);

      await axios
        .get('/api/logout')
        .then((res) => res)
        .catch((err) => err);

      router.push('/login');
    }
  };

  useEffect(() => {
    if (code) {
      gitApi(code);
    }
  }, [code]);

  return (
    <div className={classes.root}>
      <CircularProgress />
      <div>
        <SelectModal
          selectedValue={selectedValue}
          open={modalOpen}
          onClose={handleClose}
        />
      </div>
      <Backdrop className={classes.backdrop} open={backDropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default githubLogin;
