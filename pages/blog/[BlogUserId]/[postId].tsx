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
import BottomProfile from '../../../components/blog/[postID]/BottomProfile';
import { useOAIQuery } from '../../../hooks/useOAIQuery';
import useTestStore from '../../../stores/useTestStore';
import useLoadingStore from '../../../stores/useLoadingStore';

interface Props {
  params: { BlogUserId: string; postId: string; tag?: string };
}
const Post = ({ params }: Props) => {
  // const { data } = useOAIQuery({
  //   queryKey: '/v1/blog/post-info/{postId}',
  //   variables: {
  //     postId: params?.postId,
  //   },
  // });
  //
  // if (data) {
  //   console.log(data);
  // }
  // function Post({ params }: { params: { BlogUserId: string; postId: string; tag?: string } }) {
  const queryClient = useQueryClient();

  const router = useRouter();

  const classes = useStyles();

  const { data: myUserData, refetch } = useQuery(getMyUserDataApi.key, getMyUserDataApi.apiCall);

  const {
    data: userData,
    refetch: userRefetch,
  } = useQuery(`${getOneUserDataApi.key}-${params.BlogUserId}`, () =>
    getOneUserDataApi.apiCall(params.BlogUserId)
  );

  const {
    data: postData,
    refetch: postRefetch,
  } = useQuery(`${getPostInfoDataApi.key}-${params.postId}`, () =>
    getPostInfoDataApi.apiCall(params.postId)
  );

  const {
    data: userPostData,
    refetch: userPostDataRefetch,
  } = useQuery(`${getOneUserPostInfoDataApi.key}-${params.BlogUserId}`, () =>
    getOneUserPostInfoDataApi.apiCall(params.BlogUserId, params.tag ? params.tag : 'all')
  );

  // ?????? Dialog state
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  //?????? ?????? state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // ????????? ????????? ?????? ??? ????????? ?????? ??????
  const handleLike = async (action: string) => {
    if (!myUserData) {
      toast.error(`???????????? ???????????????.`, {
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

    // ?????? ????????? ????????????
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
      toast.error(`???????????? ?????? ???????????????.`, {
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

      // ????????? refetch??? ?????? ??????

      // ????????? ?????? ????????? ?????????
      // await queryClient.invalidateQueries(`${getOneUserPostInfoDataApi.key}-${params.BlogUserId}`);
      userPostDataRefetch();

      // ?????? ????????? ?????????
      await queryClient.invalidateQueries(`${getAllPostInfoApi.key}`);

      // ?????? ????????? ?????????
      await queryClient.invalidateQueries(`${getPostInfoDataApi.key}-${params.postId}`);

      router.push('/');

      // router.back();

      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!postData) {
      toast.error(`???????????? ?????? ????????? ?????????.`, {
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

  //??? ?????? ??? ?????? ??????
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
          {/* region ????????? ?????? ???????????? ?????? ?????? */}
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
                  className={classes.avatarImg}
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
          {/* endregion */}

          {/* ?????? toc ?????? ?????? */}
          <div className={classes.tocSection}>
            <div
              style={{
                position: 'sticky',
                top: '150px',
              }}>
              <Grow in timeout={1000}>
                {/* ????????? ???????????? transition ???????????? div??? ?????? ???????????? ??????????????? ????????? */}
                <div>
                  <Toc content={postData ? postData.content : ''} />
                </div>
              </Grow>
            </div>
          </div>
          {/* ?????? toc ?????? ??? */}

          {/* ?????? ????????? ?????? ?????? */}
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
              {/* ?????? ????????? ?????? */}
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

                {/* region ????????? ?????? */}
                <div style={{ width: '100%', height: '100%', marginTop: '25px' }}>
                  <img
                    style={{ marginBottom: '25px', width: '100%' }}
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${postData?.thumbnail}`}
                    alt={`${postData?.title}`}
                  />
                  <MarkDownContents contents={postData.content} />
                </div>
                {/* endregion */}

                {/* region ????????? ?????? ????????? */}
                <BottomProfile params={params} />
                {/* endregion */}

                {/* region ???????????? */}
                {/* https://react.semantic-ui.com/views/comment/#types-comment - ?????? template ?????? */}
                {/* <Typography variant="h5" gutterBottom className={classes.commentHeading}> */}
                {/*   Comments */}
                {/* </Typography> */}
                {/* <Divider /> */}
                {/* <Comment /> */}

                {/* endregion */}

                {/* region ?????? ActionButton (Like ???) ?????? ?????? */}
                <div className={classes.leftBtnsSection}>
                  <div
                    style={{
                      position: 'sticky',
                      top: '150px',
                    }}>
                    <Grow in timeout={1000}>
                      {/* ????????? ???????????? transition ???????????? div??? ?????? ???????????? ??????????????? ????????? */}
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
                {/* endregion ?????? ActionButton (Like ???) ?????? ??? */}
              </div>
            </div>
          </div>
          {/* ?????? ????????? ?????? ??? */}
        </Paper>
        <UpdateDialog
          updateDialogOpen={updateDialogOpen}
          setUpdateDialogOpen={setUpdateDialogOpen}
          postData={postData}
        />
        <ConfirmDialog
          dialogTitle="???????????? ?????? ???????????????????"
          dialogBody="????????? ?????? ????????? ????????? ??????????????????. ?????? ??? ????????? ????????? ????????? ?????? ?????????."
          confirmBtnTitle="??????"
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
    //?????? ?????? ????????????
    await queryClient.prefetchQuery(`${getOneUserDataApi.key}-${params.BlogUserId}`, () =>
      getOneUserDataApi.apiCall(
        typeof params.BlogUserId === 'string' ? params.BlogUserId : '',
        req.cookies?.Authentication
      )
    );

    // ????????? ?????? ????????????
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
