import axios from 'axios';
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
