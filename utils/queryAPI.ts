import axios from 'axios';
import { AllPostInfo } from 'types/AllPostInfo';
import { AllTagInfo } from 'types/AllTagInfo';
import { PostInfo } from 'types/PostInfo';
import { TagInfo } from 'types/TagInfo';
import { User } from 'types/User';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

/* TODO: kunhee.lim
 *  이 파일은 백엔드에서 스웨거만 다 작성해주면 모두 제거할 예정
 *  ( orval 로 작성된 코드로 대체 가능 ) */

// 유저 1명의 데이터 가져오기
export const getOneUserDataApi = {
  key: 'getOneUserData',
  apiCall: async (loginID: string, Authentication?: string): Promise<User> => {
    return await api
      .get(
        `/v1/users/${loginID}`,
        typeof Authentication === 'string'
          ? {
              withCredentials: true,
              headers: {
                Cookie: `Authentication=${Authentication || ''}`,
              },
            }
          : {
              withCredentials: true,
            }
      )
      .then((response) => response.data)
      .catch((err) => {
        console.log(err.message);
        return false;
      });
  },
};

// 유저 한명의 Tag info 가져오기
export const getOneUserTagInfoDataApi = {
  key: 'getOneUserTagInfoData',
  apiCall: async (userID: string, Authentication?: string): Promise<TagInfo> => {
    // console.log(Authentication);
    return await api
      .get(
        `/v1/blog/tags-info/${userID}`,
        typeof Authentication === 'string'
          ? {
              withCredentials: true,
              headers: {
                Cookie: `Authentication=${Authentication || ''}`,
              },
            }
          : {
              withCredentials: true,
            }
      )
      .then((response) => response.data)
      .catch((err) => {
        console.log(err.message);
        return false;
      });
  },
};

// 유저 한명의 Posts info List 가져오기
export const getOneUserPostInfoDataApi = {
  key: 'getOneUserPostInfoData',
  apiCall: async (
    BlogUserId: string,
    tag: string,
    Authentication?: string
  ): Promise<PostInfo[]> => {
    return await api
      .get(
        `/v1/blog/posts-info/${BlogUserId}/${tag}`,
        typeof Authentication === 'string'
          ? {
              withCredentials: true,
              headers: {
                Cookie: `Authentication=${Authentication || ''}`,
              },
            }
          : {
              withCredentials: true,
            }
      )
      .then((response) => response.data)
      .catch((err) => {
        console.log(err.message);
        return false;
      });
  },
};

// 특정 Post info 가져오기
export const getPostInfoDataApi = {
  key: 'getPostInfoData',
  apiCall: async (postId: string, Authentication?: string): Promise<PostInfo> => {
    return await api
      .get(
        `/v1/blog/post-info/${postId}`,
        typeof Authentication === 'string'
          ? {
              withCredentials: true,
              headers: {
                Cookie: `Authentication=${Authentication || ''}`,
              },
            }
          : {
              withCredentials: true,
            }
      )
      .then((response) => response.data)
      .catch((err) => {
        console.log(err.message);
        return false;
      });
  },
};

// 모든 Posts info 가져오기
export const getAllPostInfoApi = {
  key: 'getAllPostInfoApi',
  apiCall: async (Authentication?: string): Promise<AllPostInfo[]> => {
    return await api
      .get(
        `v1/blog/all-posts-info`,
        typeof Authentication === 'string'
          ? {
              withCredentials: true,
              headers: {
                Cookie: `Authentication=${Authentication || ''}`,
              },
            }
          : {
              withCredentials: true,
            }
      )
      .then((response) => response.data)
      .catch((err) => {
        console.log(err.message);
        return false;
      });
  },
};

// 포지션별 모든 Tags info 가져오기
export const getAllTagInfoApi = {
  key: 'getAllTagInfoApi',
  apiCall: async (Authentication?: string): Promise<AllTagInfo[]> => {
    return await api
      .get(
        `v1/blog/tags-info`,
        typeof Authentication === 'string'
          ? {
              withCredentials: true,
              headers: {
                Cookie: `Authentication=${Authentication || ''}`,
              },
            }
          : {
              withCredentials: true,
            }
      )
      .then((response) => response.data.tagInfoResult)
      .catch((err) => {
        console.log(err.message);
        return false;
      });
  },
};
