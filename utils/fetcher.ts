import axios from 'axios';

//fetcher를 다양하게 만들어서 그때그때 서버에서 오는 데이터를 변형해서 프론트에서 활용하면 좋다.
const fetcher = (url: string) => {
  return axios.get(url, { withCredentials: true }).then((response) => response.data);
};

export default fetcher;
