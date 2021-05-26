import axios from "axios";
import { GetServerSideProps } from "next";
import { useQuery, useQueryClient } from "react-query";

const getUsers = async () => {
  // const API_URL = process.env.API_URL;
  const API_URL = "http://localhost:3030";
  const res = await axios.get(`${API_URL}/api/users/all`);
  console.log(res);
  // const moviesData = await res.json();
};

export default function Home() {
  const queryClient = useQueryClient();
  const { data, status } = useQuery("users", getUsers, { initialData: null });

  return (
    <div>
      index 페이지입니다.
      <div>{/* {data?.map(user => <div>{user.email}</div>)} */}</div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};
