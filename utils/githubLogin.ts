const githubLogin = (redirectInfo?: {
  post: {
    blogUserId: string;
    postId: string;
  };
}) => {
  const CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  let REDIRECT_URL = `${process.env.NEXT_PUBLIC_LOCAL_URL}/github-login`;

  if (redirectInfo) {
    /* NOTE: LKHcoding
     *  encodeURIComponent 를 안쓰면 리다이렉트시 쿼리스트링 유실됨 */
    REDIRECT_URL += encodeURIComponent(
      `?blogUserId=${redirectInfo.post.blogUserId}&postId=${redirectInfo.post.postId}`
    );
  }

  // OAuth app을 등록할때 작성했던 redirect url과 발급받은 CLIENT_ID를 바탕으로 URL을 생성합니다.
  location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`;
};

export default githubLogin;
