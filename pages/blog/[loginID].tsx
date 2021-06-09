import { Button, Container, Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { useQuery } from 'react-query';
import { getMyUserDataApi } from '../../utils/queryAPI';

const BlogPage = () => {
  const { data, refetch } = useQuery(getMyUserDataApi.key, getMyUserDataApi.apiCall);

  const router = useRouter();

  return (
    <div>
      <Container maxWidth="lg">
        <div>블로그 페이지 입니다. {router.query && router.query.loginID}</div>
        {/* 블로그 상단 회원정보 소개 영역 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <Avatar
              color="default"
              alt="User Profile Icon"
              src={`${data?.avatarUrl || ''}`}
              style={{ height: '150px', width: '150px' }}
            />
            {data?.loginID}
          </div>
        </div>
        {/* 블로그 상단 회원정보 소개 영역 끝 */}
      </Container>
    </div>
  );
};

export default BlogPage;
