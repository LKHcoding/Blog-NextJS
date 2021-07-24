import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Avatar,
  Badge,
  Chip,
  createStyles,
  Fab,
  Grow,
  IconButton,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import { QueryClient, useQuery } from 'react-query';
import { getMyUserDataApi, getOneUserDataApi, getPostInfoDataApi } from '../../../utils/queryAPI';
import Link from 'next/link';
import { dehydrate } from 'react-query/hydration';
import MarkDownContents from '../../../components/blog/[postID]/MarkDownContents';
import Toc from '../../../components/blog/[postID]/Toc';
import ActionButton from '../../../components/common/ActionButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import axios from 'axios';
import dayjs from 'dayjs';
import { useStyles } from '../../../styles/muiStyles/blog/[BlogUserId]/[postId]Style';
import { Flip, toast } from 'react-toastify';
import UpdateDialog from './../../../components/write/UpdateDialog';

const Post = ({ params }: { params: { BlogUserId: string; postId: string } }) => {
  const router = useRouter();

  const classes = useStyles();

  const { data: myUserData, refetch } = useQuery(getMyUserDataApi.key, getMyUserDataApi.apiCall);

  const { data: userData, refetch: userRefetch } = useQuery(
    `${getOneUserDataApi.key}-${params.BlogUserId}`,
    () => getOneUserDataApi.apiCall(params.BlogUserId)
  );

  const { data: postData, refetch: postRefetch } = useQuery(
    `${getPostInfoDataApi.key}-${params.postId}`,
    () => getPostInfoDataApi.apiCall(params.postId)
  );

  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const handleLike = async (action: string) => {
    if (!myUserData) {
      toast.error(`로그인이 필요합니다.`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
        onClick: () => {
          router.push('/login');
        },
      });
      return;
    }

    const result = await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/blog/post-like/${params.postId}/${action}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => res.data)
      .catch((err) => console.log(err));
    postRefetch();
    // console.log(result);
  };

  const isLiked = (action: string) => {
    return postData?.LikeDisLike.filter(
      (item) => item.UserId === myUserData?.id && item.actionType === action
    ).length !== 0
      ? 'action'
      : 'disabled';
  };

  return (
    <div className={classes.root}>
      <Paper
        // style={{ borderRadius: '10px', margin: '100px 30px 0 30px', position: 'relative' }}
        elevation={3}>
        {/* 블로그 상단 회원정보 소개 영역 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Link href={`/blog/${userData?.loginID}`} as={`/blog/${userData?.loginID}`} key="blog">
            <a>
              <Avatar
                color="default"
                alt="User Profile Icon"
                src={`${userData?.avatarUrl || ''}`}
                style={{ marginTop: '-82px', height: '160px', width: '160px' }}
              />
            </a>
          </Link>
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
              <h3 className={classes.blogTitleStyle}>{`${userData?.loginID}'s Blog`}</h3>
            </div>
          </div>
        </div>
        {/* 블로그 상단 회원정보 소개 영역 끝 */}

        {/* 우측 toc 영역 시작 */}
        <div className={classes.tocSection}>
          <div
            style={{
              position: 'sticky',
              top: '150px',
            }}>
            <Grow in timeout={1000}>
              {/* 이유는 모르지만 transition 사용할때 div로 한번 감싸줘야 애니메이션 적용됨 */}
              <div>
                <Toc content={postData ? postData.content : ''} />
              </div>
            </Grow>
          </div>
        </div>
        {/* 우측 toc 영역 끝 */}

        {/* 메인 컨텐츠 영역 시작 */}
        <div
          style={{
            display: 'flex',
            padding: '0px 20px',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}>
          <div
            style={{
              display: 'flex',
              marginTop: '30px',
              width: '100%',
              height: '100%',
              maxWidth: '1200px',
              justifyContent: 'center',
            }}>
            {/* 메인 컨텐츠 영역 */}
            <div
              style={{
                marginBottom: '30px',
                width: '100%',
                height: '100%',
                maxWidth: '760px',
                justifyContent: 'center',
                position: 'relative',
              }}>
              <Typography style={{ overflowWrap: 'anywhere' }} variant="h3">
                {postData && postData.title}
              </Typography>
              <Typography variant="subtitle2" gutterBottom style={{ marginLeft: '3px' }}>
                {dayjs(postData?.updatedAt).format('YYYY-MM-DD A h:mm:ss')}
              </Typography>
              <div
                className={classes.tagList}
                style={{
                  display: 'flex',
                }}>
                {postData &&
                  postData.Tags.map((item, idx) => (
                    <div key={item.tagName + idx}>
                      <Chip
                        size="small"
                        label={item.tagName}
                        clickable
                        color="primary"
                        //  onDelete={handleDelete}
                        //  deleteIcon={<DoneIcon />}
                        variant="outlined"
                      />
                    </div>
                  ))}
              </div>

              <div style={{ width: '100%', height: '100%', marginTop: '25px' }}>
                <img
                  style={{ marginBottom: '25px', width: '100%' }}
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${postData?.thumbnail}`}
                  alt={`${postData?.title}`}
                />
                <MarkDownContents contents={postData ? postData.content : ''} />
              </div>

              {/* 좌측 Like 영역 시작 */}
              <div className={classes.leftBtnsSection}>
                <div
                  style={{
                    position: 'sticky',
                    top: '150px',
                  }}>
                  <Grow in timeout={1000}>
                    {/* 이유는 모르지만 transition 사용할때 div로 한번 감싸줘야 애니메이션 적용됨 */}
                    <div className={classes.btnList}>
                      <Fab aria-label="like" onClick={() => handleLike('Like')}>
                        {/* <IconButton color="default"> */}
                        <Badge
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                          badgeContent={
                            postData
                              ? postData.LikeDisLike.filter((item) => item.actionType === 'Like')
                                  .length
                              : 0
                          }
                          color="error">
                          <ThumbUpIcon
                            color={isLiked('Like')}
                            style={{ height: '27px', width: '27px' }}
                          />
                        </Badge>
                        {/* </IconButton> */}
                      </Fab>

                      <Fab aria-label="dislike" onClick={() => handleLike('DisLike')}>
                        {/* <IconButton color="default"> */}
                        <Badge
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                          badgeContent={
                            postData
                              ? postData.LikeDisLike.filter((item) => item.actionType === 'DisLike')
                                  .length
                              : 0
                          }
                          color="primary">
                          <ThumbDownIcon
                            color={isLiked('DisLike')}
                            style={{ height: '27px', width: '27px' }}
                          />
                        </Badge>
                        {/* </IconButton> */}
                      </Fab>

                      <ActionButton setUpdateDialogOpen={setUpdateDialogOpen} />
                      {/* <Toc content={postData ? postData.content : ''} /> */}
                    </div>
                  </Grow>
                </div>
              </div>
              {/* 좌측 Like 영역 끝 */}
            </div>
          </div>
        </div>
        {/* 메인 컨텐츠 영역 끝 */}
      </Paper>
      <UpdateDialog
        updateDialogOpen={updateDialogOpen}
        setUpdateDialogOpen={setUpdateDialogOpen}
        postData={postData}
      />
    </div>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, req, params } = context;

  const queryClient = new QueryClient();
  if (params) {
    //유저 정보 프리패치
    await queryClient.prefetchQuery(`${getOneUserDataApi.key}-${params.BlogUserId}`, () =>
      getOneUserDataApi.apiCall(
        'BlogUserId' in params && typeof params.BlogUserId === 'string' ? params.BlogUserId : '',
        req.cookies?.Authentication
      )
    );

    // 게시물 정보 프리패치
    await queryClient.prefetchQuery(`${getPostInfoDataApi.key}-${params.postId}`, () =>
      getPostInfoDataApi.apiCall(
        'postId' in params && typeof params.postId === 'string' ? params.postId : '',
        req.cookies?.Authentication
      )
    );
  }
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      params: params,
    },
  };
};
