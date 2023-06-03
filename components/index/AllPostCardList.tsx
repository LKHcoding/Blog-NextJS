import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from '@material-ui/core';

import { useQuery } from '@tanstack/react-query';

import PostCard from './PostCard';
import { getAllPostInfoApi } from 'utils/queryAPI';
import { useStyles } from './AllPostCardList.style';

const AllPostCardList = () => {
  const classes = useStyles();

  const { data } = useQuery([getAllPostInfoApi.key], () =>
    getAllPostInfoApi.apiCall()
  );

  if (!data) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        {data &&
          data
            ?.filter((item) => item.UserId !== 30)
            ?.map((item) => (
              <Grid
                className={classes.cardItem}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={3}
                key={item.id}
              >
                <PostCard postInfo={item} />
              </Grid>
            ))}
      </Grid>
    </div>
  );
};

export default AllPostCardList;
