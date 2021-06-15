import {
  Button,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Tooltip,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { QueryClient, useQuery } from 'react-query';
import { getOneUserDataApi } from '../../utils/queryAPI';
import Paper from '@material-ui/core/Paper';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import LanguageIcon from '@material-ui/icons/Language';
import { GetServerSideProps } from 'next';
import { dehydrate } from 'react-query/hydration';

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
        minHeight: '1500px',
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
    blogSubTitleStyle: {
      fontSize: '.75rem',
      textTransform: 'uppercase',
      fontWeight: 500,
      margin: '10px 0',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: '1.5em',
    },
    blogBioStyle: {
      fontSize: '14px',
      margin: '0 0 10px',
      color: '#999',
      textAlign: 'center',
    },
  })
);

const BlogPage = ({ params }: { params: { loginID: string } }) => {
  const classes = useStyles();
  // console.log(params);

  const { data, refetch } = useQuery(getOneUserDataApi.key, () =>
    getOneUserDataApi.apiCall(params.loginID)
  );

  return (
    <div>
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
            <Avatar
              color="default"
              alt="User Profile Icon"
              src={`${data?.avatarUrl || ''}`}
              style={{ marginTop: '-82px', height: '160px', width: '160px' }}
            />
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
                <h3 className={classes.blogTitleStyle}>{data?.loginID}</h3>
                <h6 className={classes.blogSubTitleStyle}>{data?.positionType}</h6>
                <div>
                  <Tooltip title={`${data?.githubPageUrl}`} arrow placement="top">
                    <IconButton aria-label="github-icon">
                      <GitHubIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={`${data?.email}`} arrow placement="top">
                    <IconButton aria-label="mail-icon">
                      <MailIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={`${data?.blog}`} arrow placement="top">
                    <IconButton aria-label="web-icon">
                      <LanguageIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <p className={classes.blogBioStyle}>{data?.bio}</p>
              </div>
            </div>
          </div>
          {/* 블로그 상단 회원정보 소개 영역 끝 */}
          <Container maxWidth="lg">
            <div style={{ margin: '10px' }}>ddasdfasdfasdfasdfs</div>
          </Container>
        </Paper>
      </div>
    </div>
  );
};

export default BlogPage;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return {
//     props: { params: context.params },
//   };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, req, params } = context;
  const queryClient = new QueryClient();

  const paramString = typeof params?.loginID === 'string';

  await queryClient.prefetchQuery(getOneUserDataApi.key, () =>
    getOneUserDataApi.apiCall(
      params && 'loginID' in params && typeof params.loginID === 'string' ? params.loginID : '',
      req.cookies?.Authentication
    )
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      params: params,
    },
  };
};
