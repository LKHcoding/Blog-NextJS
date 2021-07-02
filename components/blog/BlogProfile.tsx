import { Avatar, createStyles, makeStyles, Theme, Tooltip } from '@material-ui/core';
import React from 'react';
import { useQuery } from 'react-query';
import { getOneUserDataApi } from '../../utils/queryAPI';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import MailIcon from '@material-ui/icons/Mail';
import LanguageIcon from '@material-ui/icons/Language';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    blogTitleStyle: {
      color: '#3C4858',
      margin: '1.75rem 0 0.875rem',
      display: 'inline-block',
      position: 'relative',
      marginTop: '18px',
      minHeight: '32px',
      fontFamily: 'Roboto Slab,Times New Roman, serif',
      fontWeight: 700,
      textDecoration: 'none',
      fontSize: ' 1.5625rem',
      lineHeight: '1.4em',
    },
    blogSubTitleStyle: {
      fontSize: '.75rem',
      textTransform: 'uppercase',
      fontWeight: 500,
      margin: '10px 0',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: '1.5em',
    },
    blogBioStyle: {
      fontSize: '14px',
      margin: '0 0 10px',
      color: '#999',
      textAlign: 'center',
    },
  })
);

const BlogProfile = ({ params }: { params: { BlogUserId: string } }) => {
  const classes = useStyles();

  const { data, refetch } = useQuery(`${getOneUserDataApi.key}-${params.BlogUserId}`, () =>
    getOneUserDataApi.apiCall(params.BlogUserId)
  );

  return (
    <>
      {/* 블로그 상단 회원정보 소개 영역 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Avatar
          color="default"
          alt="User Profile Icon"
          src={`${data?.avatarUrl || ''}`}
          style={{ marginTop: '-82px', height: '160px', width: '160px' }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <h3 className={classes.blogTitleStyle}>{`${data?.loginID}'s Blog`}</h3>
            <h6 className={classes.blogSubTitleStyle}>{data?.positionType}</h6>
            <div>
              <Tooltip title={`${data?.githubPageUrl}`} arrow placement="top">
                <IconButton aria-label="github-icon">
                  <GitHubIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={`${data?.email}`} arrow placement="top">
                <IconButton aria-label="mail-icon">
                  <MailIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={`${data?.blog}`} arrow placement="top">
                <IconButton aria-label="web-icon">
                  <LanguageIcon />
                </IconButton>
              </Tooltip>
            </div>
            <p className={classes.blogBioStyle}>{data?.bio}</p>
          </div>
        </div>
      </div>
      {/* 블로그 상단 회원정보 소개 영역 끝 */}
    </>
  );
};

export default BlogProfile;
