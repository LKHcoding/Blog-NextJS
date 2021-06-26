import axios from 'axios';
import { IPostInfoType } from '../types/PostInfoType';
import { ITagInfoType } from '../types/TagInfoType';
import { IUser } from '../types/UserType';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// serverSide에서 호출할 경우 apiCall에 cookie의 token값을 넣어서 호출하여
// 함수를 재활용한다.
export const getMyUserDataApi = {
  key: 'getMyUserData',
  apiCall: async (Authentication?: any): Promise<IUser> => {
    // console.log(Authentication);
    return await api
      .get(
        `/api/users`,
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

/**
 * 유저 1명의 데이터 가져오기
 */
export const getOneUserDataApi = {
  key: 'getOneUserData',
  apiCall: async (loginID: string, Authentication?: any): Promise<IUser> => {
    // console.log(Authentication);
    return await api
      .get(
        `/api/users/${loginID}`,
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

/**
 * 유저 한명의 Tag info 가져오기
 */
export const getOneUserTagInfoDataApi = {
  key: 'getOneUserTagInfoData',
  apiCall: async (userID: string, Authentication?: any): Promise<ITagInfoType> => {
    // console.log(Authentication);
    return await api
      .get(
        `/api/blog/tags-info/${userID}`,
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

/**
 * 유저 한명의 Posts info List 가져오기
 */
export const getOneUserPostInfoDataApi = {
  key: 'getOneUserPostInfoData',
  apiCall: async (BlogUserId: string, Authentication?: any): Promise<IPostInfoType[]> => {
    // console.log(Authentication);
    return await api
      .get(
        `/api/blog/posts-info/${BlogUserId}`,
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

/**
 * 특정 Post info 가져오기
 */
export const getPostInfoDataApi = {
  key: 'getPostInfoData',
  apiCall: async (postId: string, Authentication?: any): Promise<IPostInfoType> => {
    // console.log(Authentication);
    return await api
      .get(
        `/api/blog/post-info/${postId}`,
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
