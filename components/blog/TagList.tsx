import React, { FC } from 'react';
import Link from 'next/link';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Badge, Typography } from '@material-ui/core';

import { useQuery } from '@tanstack/react-query';

import { getOneUserTagInfoDataApi } from 'utils/queryAPI';
import { useStyles } from './TagList.style';

type TagListProps = {
  params: {
    BlogUserId: string;
  };
  tag: string | null;
};

const TagList: FC<TagListProps> = ({ params, tag }) => {
  const classes = useStyles();

  const { data } = useQuery(
    [`${getOneUserTagInfoDataApi.key}-${params.BlogUserId}`],
    () => getOneUserTagInfoDataApi.apiCall(params.BlogUserId)
  );
  data?.tagInfoResult.sort((a, b) => b.BlogPosts.length - a.BlogPosts.length);

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <Typography variant="h6" component="h2" className={classes.title}>
          태그 목록
        </Typography>
        <Divider />
        {data && (
          <Link
            scroll={false}
            href={`/blog/${params.BlogUserId}?tag=${'all'}`}
            as={`/blog/${params.BlogUserId}?tag=${'all'}`}
          >
            <a>
              <ListItem selected={tag === 'all'} button alignItems="center">
                <ListItemText primary={`전체 작성 글`} />
                <Badge
                  badgeContent={data.allPostCount}
                  color="secondary"
                  overlap={'rectangular'}
                ></Badge>
              </ListItem>
            </a>
          </Link>
        )}
        {data &&
          data.tagInfoResult.map((item) => (
            <Link
              scroll={false}
              key={item.tagName}
              href={`/blog/${params.BlogUserId}?tag=${item.tagName}`}
              as={`/blog/${params.BlogUserId}?tag=${item.tagName}`}
            >
              <a>
                <ListItem selected={tag === item.tagName} button alignItems="center">
                  <ListItemText primary={`${item.tagName}`} />
                  <Badge
                    badgeContent={item.BlogPosts.length}
                    color="primary"
                    overlap={'rectangular'}
                  ></Badge>
                </ListItem>
              </a>
            </Link>
          ))}
      </List>
    </div>
  );
};

export default TagList;
