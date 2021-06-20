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
import { BlogProfile } from '../../components/blog/BlogProfile';
import { TagList } from '../../components/blog/TagList';
import { PostList } from '../../components/blog/PostList';

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
  })
);

const BlogPage = ({ params }: { params: { loginID: string } }) => {
  const classes = useStyles();

  // const { data, refetch } = useQuery(`${getOneUserDataApi.key}-${params.loginID}`, () =>
  //   getOneUserDataApi.apiCall(params.loginID)
  // );

  return (
    <div>
      <div className={classes.root}>
        <Paper style={{ borderRadius: '10px', margin: '100px 30px 0 30px' }} elevation={3}>
          <BlogProfile params={params} />

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
              <TagList params={params} />
              <PostList />
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default BlogPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, req, params } = context;
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery(getOneUserDataApi.key, () =>
  //   getOneUserDataApi.apiCall(
  //     params && 'loginID' in params && typeof params.loginID === 'string' ? params.loginID : '',
  //     req.cookies?.Authentication
  //   )
  // );

  return {
    props: {
      // dehydratedState: dehydrate(queryClient),
      params: params,
    },
  };
};
