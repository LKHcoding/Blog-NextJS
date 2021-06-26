import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Avatar, createStyles, makeStyles, Paper, Theme } from '@material-ui/core';
import { QueryClient, useQuery } from 'react-query';
import { getOneUserDataApi, getPostInfoDataApi } from '../../../utils/queryAPI';
import Link from 'next/link';
import { dehydrate } from 'react-query/hydration';
import { MarkDownContents } from '../../../components/blog/[postID]/MarkDownContents';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      '& > *': {
        margin: theme.spacing(1),
        boxShadow:
          '0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)',
        width: '100%',
        height: '100%',
        minHeight: '800px',
        maxWidth: '1400px',
      },
    },
    blogTitleStyle: {
      color: '#3C4858',
      margin: '1.75rem 0 0.875rem',
      display: 'inline-block',
      position: 'relative',
      marginTop: '18px',
      minHeight: '32px',
      fontFamily: 'Roboto Slab,Times New Roman, serif',
      fontWeight: 700,
      textDecoration: 'none',
      fontSize: ' 1.5625rem',
      lineHeight: '1.4em',
    },
  })
);

const Post = ({ params }: { params: { BlogUserId: string; postId: string } }) => {
  const classes = useStyles();

  const { data: userData, refetch: userRefetch } = useQuery(
    `${getOneUserDataApi.key}-${params.BlogUserId}`,
    () => getOneUserDataApi.apiCall(params.BlogUserId)
  );

  const { data: postData, refetch: postRefetch } = useQuery(
    `${getPostInfoDataApi.key}-${params.postId}`,
    () => getPostInfoDataApi.apiCall(params.postId)
  );

  // const router = useRouter();
  // console.log(router.query);

  return (
    <div className={classes.root}>
      <Paper style={{ borderRadius: '10px', margin: '100px 30px 0 30px' }} elevation={3}>
        {/* 블로그 상단 회원정보 소개 영역 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Link
            href={{
              pathname: '/blog/[BlogUserId]',
              query: { BlogUserId: `${userData?.loginID}` },
            }}
            key="blog">
            <a>
              <Avatar
                color="default"
                alt="User Profile Icon"
                src={`${userData?.avatarUrl || ''}`}
                style={{ marginTop: '-82px', height: '160px', width: '160px' }}
              />
            </a>
          </Link>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <h3 className={classes.blogTitleStyle}>{`${userData?.loginID}'s Blog`}</h3>
            </div>
          </div>
        </div>
        {/* 블로그 상단 회원정보 소개 영역 끝 */}

        <div
          style={{
            display: 'flex',
            padding: '0px 20px',
            width: '100%',
            justifyContent: 'center',
          }}>
          <div
            style={{
              display: 'flex',
              marginTop: '30px',
              width: '100%',
              maxWidth: '1200px',
              justifyContent: 'center',
            }}>
            <div style={{ marginBottom: '30px' }}>
              <div>{postData && postData.title}</div>
              <div>
                <MarkDownContents contents={postData ? postData.content : ''} />
              </div>
            </div>
            {/* <TagList params={params} /> */}
            {/* <PostList params={params} /> */}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, req, params } = context;

  const queryClient = new QueryClient();
  if (params) {
    //유저 정보 프리패치
    await queryClient.prefetchQuery(`${getOneUserDataApi.key}-${params.BlogUserId}`, () =>
      getOneUserDataApi.apiCall(
        'BlogUserId' in params && typeof params.BlogUserId === 'string' ? params.BlogUserId : '',
        req.cookies?.Authentication
      )
    );

    // 게시물 정보 프리패치
    await queryClient.prefetchQuery(`${getPostInfoDataApi.key}-${params.postId}`, () =>
      getPostInfoDataApi.apiCall(
        'postId' in params && typeof params.postId === 'string' ? params.postId : '',
        req.cookies?.Authentication
      )
    );
  }
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      params: params,
    },
  };
};
