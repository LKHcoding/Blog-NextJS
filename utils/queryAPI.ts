import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
//fetcher를 다양하게 만들어서 그때그때 서버에서 오는 데이터를 변형해서 프론트에서 활용하면 좋다.
export const getMyUserData = {
  key: 'getMyUserData',
  apiCall: async (Authentication?: string | null) => {
    console.log(Authentication);
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
        console.log(err);
      });
  },
};
