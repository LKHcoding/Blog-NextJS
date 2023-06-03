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
import {
  dehydrate,
  QueryClient,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import MarkDownContents from 'components/blog/[postID]/MarkDownContents';
import Toc from 'components/blog/[postID]/Toc';
import ActionButton from 'components/common/ActionButton';
import UpdateDialog from 'components/write/update/UpdateDialog';
import {
  getAllPostInfoApi,
  getOneUserDataApi,
  getOneUserPostInfoDataApi,
  getPostInfoDataApi,
} from 'utils/queryAPI';
import ConfirmDialog from 'components/common/ConfirmDialog';
import CustomHeader from 'components/common/SEO/CustomHeader';
import removeMD from 'remove-markdown';
import BottomProfile from 'components/blog/[postID]/BottomProfile';
import CommentList from 'components/blog/[postID]/CommentList';
import {
  getBlogCommentPostId,
  getGetBlogCommentPostIdQueryKey,
} from 'stores/remoteStore/endpoints/blog/blog';
import { useGetUsers } from 'stores/remoteStore/endpoints/user/user';
import CommentInput from 'components/blog/[postID]/CommentInput';
import toast from 'utils/toast';
import { useStyles } from './[postId].style';

type PostProps = {
  params: { BlogUserId: string; postId: string; tag?: string };
};
const Post = ({ params }: PostProps) => {
  const classes = useStyles();
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data: myUserData } = useGetUsers();
  const { data: userData } = useQuery(
    [`${getOneUserDataApi.key}-${params.BlogUserId}`],
    () => getOneUserDataApi.apiCall(params.BlogUserId)
  );
  const { data: postData, refetch: postRefetch } = useQuery(
    [`${getPostInfoDataApi.key}-${params.postId}`],
    () => getPostInfoDataApi.apiCall(params.postId)
  );
  const { refetch: userPostDataRefetch } = useQuery(
    [`${getOneUserPostInfoDataApi.key}-${params.BlogUserId}`],
    () =>
      getOneUserPostInfoDataApi.apiCall(
        params.BlogUserId,
        params.tag ? params.tag : 'all'
      )
  );

  // 수정 Dialog state
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  //삭제 모달 state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // 좋아요 싫어요 실행 및 로그인 여부 확인
  const handleLike = async (action: string) => {
    if (!myUserData) {
      toast.error(`로그인이 필요합니다.`, {
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
      toast.error(
        `${result.response.data.statusCode}-${result.response.data.message}`
      );
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
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/blog/delete-post/${params.postId}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => res)
      .catch((err) => err);

    // 에러 메세지 띄워주기
    if (deleteResult?.response) {
      toast.error(`${deleteResult.response.data.message}`);
    }

    if (deleteResult.status === 200) {
      toast.error(`게시글이 삭제 되었습니다.`);

      userPostDataRefetch();

      // 모든 게시물 데이터
      await queryClient.invalidateQueries([`${getAllPostInfoApi.key}`]);

      // 특정 게시물 데이터
      await queryClient.invalidateQueries([
        `${getPostInfoDataApi.key}-${params.postId}`,
      ]);

      router.push('/');
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!postData) {
      toast.error(`존재하지 않는 게시물 입니다.`);

      router.push('/');
    }
  }, []);

  //글 삭제 후 오류 방지
  if (!postData) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
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
        <Paper elevation={3}>
          {/* region 게시글 상단 회원정보 소개 영역 */}
          <div className={classes.paperHeader}>
            <Link
              href={`/blog/${userData?.loginID}`}
              as={`/blog/${userData?.loginID}`}
            >
              <a>
                <Avatar
                  className={classes.avatarImg}
                  color="default"
                  alt="User Profile Icon"
                  src={`${userData?.avatarUrl || ''}`}
                />
              </a>
            </Link>

            <div className={classes.blogNameWrapper}>
              <div className={classes.blogName}>
                <Link
                  href={`/blog/${userData?.loginID}`}
                  as={`/blog/${userData?.loginID}`}
                >
                  <a>
                    <h3
                      className={classes.blogTitleStyle}
                    >{`${userData?.loginID}'s Blog`}</h3>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          {/* endregion */}

          {/* 우측 toc 영역 시작 */}
          <div className={classes.tocSection}>
            <div>
              <Grow in timeout={1000}>
                {/* 이유는 모르지만 transition 사용할때 div 로 한번 감싸줘야 애니메이션 적용됨 */}
                <div>
                  <Toc content={postData ? postData.content : ''} />
                </div>
              </Grow>
            </div>
          </div>
          {/* 우측 toc 영역 끝 */}

          {/* 메인 컨텐츠 영역 시작 */}
          <div className={classes.postBodyContainer}>
            <div>
              {/* 메인 컨텐츠 영역 */}
              <div>
                <Typography variant="h3" className={classes.postTitle}>
                  {postData && postData.title}
                </Typography>

                <Typography
                  variant="subtitle2"
                  gutterBottom
                  className={classes.postSubTitle}
                >
                  {dayjs(postData?.updatedAt).format('YYYY-MM-DD A h:mm:ss')}
                </Typography>

                <div className={classes.tagList}>
                  {postData &&
                    postData.Tags.map((item, idx) => (
                      <div key={item.tagName + idx}>
                        <Chip
                          size="small"
                          label={item.tagName}
                          clickable
                          color="primary"
                          variant="outlined"
                        />
                      </div>
                    ))}
                </div>

                {/* region 게시글 본문 */}
                <div className={classes.contentContainer}>
                  <img
                    className={classes.postBannerImage}
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${postData?.thumbnail}`}
                    alt={`${postData?.title}`}
                  />
                  <MarkDownContents contents={postData.content} />
                </div>
                {/* endregion */}

                {/* region 게시물 하단 프로필 */}
                <BottomProfile params={params} />
                {/* endregion */}

                {/* region 댓글영역 */}
                <CommentList postId={params.postId} />

                <CommentInput />

                {/* endregion */}

                {/* region 좌측 ActionButton (Like 등) 영역 시작 */}
                <div className={classes.leftBtnsSection}>
                  <div>
                    <Grow in timeout={1000}>
                      <div className={classes.btnList}>
                        <Fab aria-label="like" onClick={() => handleLike('Like')}>
                          <Badge
                            overlap={'rectangular'}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                            badgeContent={
                              postData
                                ? postData.LikeDisLike.filter(
                                    (item) => item.actionType === 'Like'
                                  ).length
                                : 0
                            }
                            color="error"
                          >
                            <ThumbUpIcon
                              color={isLiked('Like')}
                              className={classes.thumbIcon}
                            />
                          </Badge>
                        </Fab>

                        <Fab
                          aria-label="dislike"
                          onClick={() => handleLike('DisLike')}
                        >
                          <Badge
                            overlap={'rectangular'}
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
                            color="primary"
                          >
                            <ThumbDownIcon
                              color={isLiked('DisLike')}
                              className={classes.thumbIcon}
                            />
                          </Badge>
                        </Fab>

                        <ActionButton
                          isMyPost={
                            myUserData?.id === postData?.UserId ||
                            myUserData?.role === 'admin'
                          }
                          setUpdateDialogOpen={setUpdateDialogOpen}
                          setDeleteDialogOpen={setDeleteDialogOpen}
                        />
                      </div>
                    </Grow>
                  </div>
                </div>
                {/* endregion 좌측 ActionButton (Like 등) 영역 끝 */}
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
  const { req, params } = context;

  const queryClient = new QueryClient();

  if (params && 'BlogUserId' in params && 'postId' in params) {
    const postId = params.postId;
    const blogUserId = params.BlogUserId;

    if (typeof postId !== 'string' || typeof blogUserId !== 'string') {
      return {
        props: {
          dehydratedState: dehydrate(queryClient),
          params: params,
        },
      };
    }

    //유저 정보 프리패치
    await queryClient.prefetchQuery([`${getOneUserDataApi.key}-${blogUserId}`], () =>
      getOneUserDataApi.apiCall(blogUserId, req.cookies?.Authentication)
    );

    // 게시물 정보 프리패치
    await queryClient.prefetchQuery([`${getPostInfoDataApi.key}-${postId}`], () =>
      getPostInfoDataApi.apiCall(postId, req.cookies?.Authentication)
    );

    // 댓글 정보 프리패치
    await queryClient.prefetchQuery(getGetBlogCommentPostIdQueryKey(postId), () =>
      getBlogCommentPostId(postId)
    );
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      params: params,
    },
  };
};
