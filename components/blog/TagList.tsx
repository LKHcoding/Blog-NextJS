import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { Badge, ListSubheader, Typography } from '@material-ui/core';
import { useQuery } from 'react-query';
import { getOneUserTagInfoDataApi } from '../../utils/queryAPI';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // width: '100%',
      minWidth: '250px',
      // maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const TagList = ({ params }: { params: { BlogUserId: string } }) => {
  const classes = useStyles();

  const { data, refetch } = useQuery(`${getOneUserTagInfoDataApi.key}-${params.BlogUserId}`, () =>
    getOneUserTagInfoDataApi.apiCall(params.BlogUserId)
  );

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <Typography variant="h6" component="h2" style={{ marginLeft: '15px', marginBottom: '8px' }}>
          태그 목록
        </Typography>
        <Divider />
        {data && (
          <ListItem button alignItems="center">
            <ListItemText primary={`전체 작성 글`} />
            <Badge badgeContent={data.allPostCount} color="secondary"></Badge>
          </ListItem>
        )}
        {data &&
          data.tagInfoResult.map((item) => (
            <ListItem button key={item.tagName} alignItems="center">
              <ListItemText primary={`${item.tagName}`} />
              <Badge badgeContent={item.BlogPosts.length} color="primary"></Badge>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default TagList;
