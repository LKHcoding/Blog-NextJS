import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useQuery } from 'react-query';
import { getAllPostInfoApi } from '../../utils/queryAPI';
import PostCard from './PostCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
      padding: '15px 35px',
      backgroundColor: '#f6f6f6',
    },
    cardItem: {
      margin: '5px 0px',
    },
  })
);

const AllPostCardList = () => {
  const classes = useStyles();

  const { data, isLoading, refetch } = useQuery(getAllPostInfoApi.key, getAllPostInfoApi.apiCall);

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3} direction="row" justify="flex-start" alignItems="center">
          {data?.map((item) => (
            <Grid
              className={classes.cardItem}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={3}
              key={item.id}>
              <PostCard postInfo={item} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default AllPostCardList;
