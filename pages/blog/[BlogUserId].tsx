import Paper from '@material-ui/core/Paper';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import BlogProfile from '../../components/blog/BlogProfile';
import PostList from '../../components/blog/PostList';
import TagList from '../../components/blog/TagList';
import { useStyles } from './[BlogUserId].style';

type BlogPageProps = {
  params: {
    BlogUserId: string;
  };
};

const BlogPage = ({ params }: BlogPageProps) => {
  const classes = useStyles();
  const router = useRouter();

  if (!params.BlogUserId) {
    return null;
  }

  return (
    <div>
      <Head>
        <title>{`${params.BlogUserId}'s Blog - Develogger`}</title>
      </Head>
      <div className={classes.root}>
        <Paper
          style={{ borderRadius: '10px', margin: '100px 30px 15px 30px' }}
          elevation={3}
        >
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

  return {
    props: {
      params,
    },
  };
};
