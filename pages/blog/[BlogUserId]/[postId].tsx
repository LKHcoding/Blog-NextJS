import {
  Avatar,
  Badge,
  Chip,
  CircularProgress,
  Fab,
  Grow,
  Paper,
  Typography,
} from '@material-ui/core';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import axios from 'axios';
import dayjs from 'dayjs';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { Flip, toast } from 'react-toastify';
import MarkDownContents from '../../../components/blog/[postID]/MarkDownContents';
import Toc from '../../../components/blog/[postID]/Toc';
import ActionButton from '../../../components/common/ActionButton';
import UpdateDialog from '../../../components/write/update/UpdateDialog';
import { useStyles } from '../../../styles/muiStyles/blog/[BlogUserId]/[postId]Style';
import {
  getAllPostInfoApi,
  getMyUserDataApi,
  getOneUserDataApi,
  getOneUserPostInfoDataApi,
  getPostInfoDataApi,
} from '../../../utils/queryAPI';
import ConfirmDialog from './../../../components/common/ConfirmDialog';
import CustomHeader from './../../../components/common/SEO/CustomHeader';
import removeMD from 'remove-markdown';
import { VFC } from 'react';

interface Props {
  params: { BlogUserId: string; postId: string; tag?: string };
}
const Post = ({ params }: Props) => {
  // function Post({ params }: { params: { BlogUserId: string; postId: string; tag?: string } }) {
  const queryClient = useQueryClient();

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

  const { data: userPostData, refetch: userPostDataRefetch } = useQuery(
    `${getOneUserPostInfoDataApi.key}-${params.BlogUserId}`,
    () => getOneUserPostInfoDataApi.apiCall(params.BlogUserId, params.tag ? params.tag : 'all')
  );

  // 수정 Dialog state
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  //삭제 모달 state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // 좋아요 싫어요 실행 및 로그인 여부 확인
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
      .then((res) => res)
      .catch((err) => err);

    if (result?.response) {
      toast.error(`${result.response.data.statusCode}-${result.response.data.message}`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
        // onClick: () => {
        //   router.push('/');
        // },
      });
    } else {
      postRefetch();
    }
  };

  const isLiked = (action: string) => {
    return postData?.LikeDisLike.filter(
      (item) => item.UserId === myUserData?.id && item.actionType === action
    ).length !== 0
      ? 'action'
      : 'disabled';
  };

  const handleDelete = async () => {
    const deleteResult = await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/v1/blog/delete-post/${params.postId}`, {
        withCredentials: true,
      })
      .then((res) => res)
      .catch((err) => err);

    // 에러 메세지 띄워주기
    if (deleteResult?.response) {
      toast.error(`${deleteResult.response.data.message}`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
        // onClick: () => {
        //   router.push('/');
        // },
      });
    }

    if (deleteResult.status === 200) {
      toast.error(`게시글이 삭제 되었습니다.`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
        // onClick: () => {
        //   router.push('/');
        // },
      });

      // 데이터 refetch를 위한 영역

      // 한명의 유저 게시물 데이터
      // await queryClient.invalidateQueries(`${getOneUserPostInfoDataApi.key}-${params.BlogUserId}`);
      userPostDataRefetch();

      // 모든 게시물 데이터
      await queryClient.invalidateQueries(`${getAllPostInfoApi.key}`);

      // 특정 게시물 데이터
      await queryClient.invalidateQueries(`${getPostInfoDataApi.key}-${params.postId}`);

      router.push('/');

      // router.back();

      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!postData) {
      toast.error(`존재하지 않는 게시물 입니다.`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });

      router.push('/');
      // router.back();
    }
  }, []);

  //글 삭제 후 오류 방지
  if (!postData) {
    return (
      <div
        style={{
          width: '100%',
          height: '81vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CircularProgress />
        {/* <Backdrop className={classes.backdrop} open={backDropOpen}>
          <CircularProgress color="inherit" />
        </Backdrop> */}
      </div>
    );
  }

  if (!params.BlogUserId) {
    return null;
  }

  return (
    <>
      <CustomHeader
        title={postData.title}
        description={`${removeMD(postData.content)
          .slice(0, 198)
          .replace(/\s{2,}/gi, ' ')
          .replace(/\n/g, ' ')}..`}
        keywords={postData.Tags.map((item) => item.tagName) || ['']}
        author="Develogger"
        canonical={`${process.env.NEXT_PUBLIC_API_URL}${router.asPath}`}
        ogImageURL={`${process.env.NEXT_PUBLIC_API_URL}/${postData.thumbnail}`}
        twitterImageURL={`${process.env.NEXT_PUBLIC_API_URL}/${postData.thumbnail}`}
      />
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
            <Link href={`/blog/${userData?.loginID}`} as={`/blog/${userData?.loginID}`}>
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
                <Link href={`/blog/${userData?.loginID}`} as={`/blog/${userData?.loginID}`}>
                  {/* <a> */}
                  <a style={{ margin: '18px 0 0.875rem' }}>
                    <h3 className={classes.blogTitleStyle}>{`${userData?.loginID}'s Blog`}</h3>
                  </a>
                </Link>
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
                  marginBottom: '80px',
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
                  <MarkDownContents contents={postData.content} />
                </div>

                {/* 좌측 ActionButton (Like 등) 영역 시작 */}
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
                                ? postData.LikeDisLike.filter(
                                    (item) => item.actionType === 'DisLike'
                                  ).length
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

                        <ActionButton
                          isMyPost={
                            myUserData?.id === postData?.UserId || myUserData?.role === 'admin'
                          }
                          setUpdateDialogOpen={setUpdateDialogOpen}
                          setDeleteDialogOpen={setDeleteDialogOpen}
                        />
                        {/* <Toc content={postData ? postData.content : ''} /> */}
                      </div>
                    </Grow>
                  </div>
                </div>
                {/* 좌측 ActionButton (Like 등) 영역 끝 */}
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
        <ConfirmDialog
          dialogTitle="게시글을 삭제 하시겠습니까?"
          dialogBody="삭제를 위해 게시글 제목을 입력해주세요. 삭제 된 후에는 게시글 복원이 불가 합니다."
          confirmBtnTitle="삭제"
          callbackConfirm={handleDelete}
          deleteDialogOpen={deleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          postTitle={postData.title}
        />
      </div>
    </>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, req, params } = context;

  const queryClient = new QueryClient();
  // const queryClient = useQueryClient();

  if (params && 'BlogUserId' in params && 'postId' in params) {
    //유저 정보 프리패치
    await queryClient.prefetchQuery(`${getOneUserDataApi.key}-${params.BlogUserId}`, () =>
      getOneUserDataApi.apiCall(
        typeof params.BlogUserId === 'string' ? params.BlogUserId : '',
        req.cookies?.Authentication
      )
    );

    // 게시물 정보 프리패치
    await queryClient.prefetchQuery(`${getPostInfoDataApi.key}-${params.postId}`, () =>
      getPostInfoDataApi.apiCall(
        typeof params.postId === 'string' ? params.postId : '',
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
