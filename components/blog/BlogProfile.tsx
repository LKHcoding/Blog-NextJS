import React from 'react';

import { Avatar, Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import MailIcon from '@material-ui/icons/Mail';
import LanguageIcon from '@material-ui/icons/Language';

import { useQuery } from '@tanstack/react-query';

import { getOneUserDataApi } from 'utils/queryAPI';
import { useStyles } from './BlogProfile.style';

type BlogProfileProps = {
  params: { BlogUserId: string };
};
const BlogProfile = ({ params }: BlogProfileProps) => {
  const classes = useStyles();

  const { data } = useQuery([`${getOneUserDataApi.key}-${params.BlogUserId}`], () =>
    getOneUserDataApi.apiCall(params.BlogUserId)
  );

  return (
    <div className={classes.root}>
      <Avatar
        color="default"
        alt="User Profile Icon"
        src={`${data?.avatarUrl || ''}`}
        className={classes.avatar}
      />

      <div className={classes.ownerInfoContainer}>
        <div className={classes.ownerInfoWrapper}>
          <h3 className={classes.title}>{`${data?.loginID}'s Blog`}</h3>
          <h6 className={classes.subtitle}>{data?.positionType}</h6>
          <div>
            <Tooltip
              title={`${
                data?.githubPageUrl !== ''
                  ? data?.githubPageUrl
                  : '등록된 정보가 없습니다.'
              }`}
              arrow
              placement="top"
            >
              <a
                href={`${data?.githubPageUrl !== '' ? data?.githubPageUrl : '#'}`}
                target={`${data?.githubPageUrl !== '' ? '_blank' : ''}`}
                rel="noopener noreferrer"
              >
                <IconButton aria-label="github-icon">
                  <GitHubIcon />
                </IconButton>
              </a>
            </Tooltip>
            <Tooltip
              title={`${
                data?.email !== '' ? data?.email : '등록된 정보가 없습니다.'
              }`}
              arrow
              placement="top"
            >
              <a href={data?.email !== '' ? `mailto:${data?.email}` : '#'}>
                <IconButton aria-label="mail-icon">
                  <MailIcon />
                </IconButton>
              </a>
            </Tooltip>
            <Tooltip
              title={`${data?.blog !== '' ? data?.blog : '등록된 정보가 없습니다.'}`}
              arrow
              placement="top"
            >
              <a
                href={`${data?.blog !== '' ? data?.blog : '#'}`}
                target={`${data?.blog !== '' ? '_blank' : ''}`}
                rel="noopener noreferrer"
              >
                <IconButton aria-label="web-icon">
                  <LanguageIcon />
                </IconButton>
              </a>
            </Tooltip>
          </div>
          <p className={classes.bio}>{data?.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogProfile;
