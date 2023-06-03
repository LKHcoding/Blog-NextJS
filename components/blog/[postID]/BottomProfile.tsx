import React from 'react';
import Link from 'next/link';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import { useQuery } from '@tanstack/react-query';

import { useStyles } from './BottomProfile.style';
import { getOneUserDataApi } from 'utils/queryAPI';

type BottomProfileProps = {
  params: { BlogUserId: string; postId: string; tag?: string };
};

export default function BottomProfile({ params }: BottomProfileProps) {
  const classes = useStyles();

  const { data: userData } = useQuery(
    [`${getOneUserDataApi.key}-${params.BlogUserId}`],
    () => getOneUserDataApi.apiCall(params.BlogUserId)
  );

  return (
    <Card className={classes.root}>
      <CardContent>
        <Link href={`/blog/${userData?.loginID}`} as={`/blog/${userData?.loginID}`}>
          <a>
            <Avatar
              className={classes.avatarImg}
              color="default"
              alt="User Profile Icon"
              src={`${userData?.avatarUrl || ''}`}
            />
          </a>
        </Link>
      </CardContent>
      <CardActions className={classes.cardAction}>
        <Link href={`/blog/${userData?.loginID}`} as={`/blog/${userData?.loginID}`}>
          <Typography variant="h5" gutterBottom>
            {userData?.loginID}
          </Typography>
        </Link>
        <Typography variant="button" display="block" gutterBottom>
          {userData?.bio}
        </Typography>
      </CardActions>
    </Card>
  );
}
