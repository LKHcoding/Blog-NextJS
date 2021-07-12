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
import BlogProfile from '../../components/blog/BlogProfile';
import TagList from '../../components/blog/TagList';
import PostList from '../../components/blog/PostList';
import { useStyles } from '../../styles/muiStyles/blog/[BlogUserId]Style';

const BlogPage = ({ params }: { params: { BlogUserId: string } }) => {
  const classes = useStyles();

  // const { data, refetch } = useQuery(`${getOneUserDataApi.key}-${params.loginID}`, () =>
  //   getOneUserDataApi.apiCall(params.loginID)
  // );

  return (
    <div>
      <div className={classes.root}>
        <Paper style={{ borderRadius: '10px', margin: '100px 30px 0 30px' }} elevation={3}>
          <BlogProfile params={params} />

          <div className={classes.container}>
            <div className={classes.contents}>
              <TagList params={params} />
              <PostList params={params} />
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
