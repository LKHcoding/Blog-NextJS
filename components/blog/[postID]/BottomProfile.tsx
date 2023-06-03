import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@tanstack/react-query';
import { getOneUserDataApi } from 'utils/queryAPI';
import { Avatar } from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 80,
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
  },
  avatarImg: {
    height: '130px',
    width: '130px',
    transition: 'all 0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  cardAction: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    '& h5': {
      marginLeft: '8px',
      transition: 'all 0.2s',
      cursor: 'pointer',
    },
    '& h5:hover': {
      textDecoration: 'underline',
    },
  },
});

interface Props {
  params: { BlogUserId: string; postId: string; tag?: string };
}

export default function BottomProfile({ params }: Props) {
  const classes = useStyles();

  const { data: userData, refetch: userRefetch } = useQuery(
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
