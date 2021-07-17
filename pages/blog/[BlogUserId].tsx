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
import React, { FC } from 'react';
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

interface Props {
  params: {
    BlogUserId: string;
  };
}

const BlogPage: FC<Props> = ({ params }) => {
  const classes = useStyles();
  const router = useRouter();

  // console.log(router.query.tag);

  // const { data, refetch } = useQuery(`${getOneUserDataApi.key}-${params.loginID}`, () =>
  //   getOneUserDataApi.apiCall(params.loginID)
  // );

  return (
    <div>
      <div className={classes.root}>
        <Paper style={{ borderRadius: '10px', margin: '100px 30px 15px 30px' }} elevation={3}>
          <BlogProfile params={params} />

          <div className={classes.container}>
            <div className={classes.contents}>
              <TagList
                params={params}
                tag={typeof router.query.tag === 'string' ? router.query.tag : null}
              />
              <PostList
                params={params}
                tag={typeof router.query.tag === 'string' ? router.query.tag : null}
              />
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

  // console.log(query);

  return {
    props: {
      // dehydratedState: dehydrate(queryClient),
      params,
    },
  };
};
