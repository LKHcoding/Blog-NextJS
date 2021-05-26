import { GetServerSideProps } from 'next';
import { useQuery, useQueryClient } from 'react-query';

export default function Home() {
  // console.log("this is home component", process.env.APIURL);
  const queryClient = useQueryClient();
  // const { data, status } = useQuery("users", getUsers, { initialData: null });

  return (
    <>
      index 페이지입니다.
      <div>{process.env.NEXT_PUBLIC_API_URL}</div>
    </>
  );
}
