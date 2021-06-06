import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
//fetcher를 다양하게 만들어서 그때그때 서버에서 오는 데이터를 변형해서 프론트에서 활용하면 좋다.
const getFetcher = (url: string) => {
  return api
    .get(url, { withCredentials: true })
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export default getFetcher;