import { Button } from '@material-ui/core';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { FC, useEffect } from 'react';
import cookie from 'js-cookie';

interface Props {
  query: any;
}
const MyProfile = ({ query }: Props) => {
  console.log('query : ', query);

  return (
    <>
      <Button color="primary" variant="contained">
        내정보가져오기
      </Button>
    </>
  );
};

// MyProfile.getInitialProps = async (context: { query: any }) => {
//   const ApiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const data = await axios
//     .get(`${ApiUrl}/api/users/all`)
//     .then((res) => res.data)
//     .catch((err) => console.log(err.message));
//   return {
//     props: {
//       data: data || null,
//     },
//   };
// };

MyProfile.getInitialProps = async (context: { query: any }) => {
  const { query } = context;

  return { query };
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const ApiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const data = await axios
//     .post(
//       `${ApiUrl}/auth/login`,
//       {
//         email: 'test4@gmail.com',
//         password: 'test4',
//       },
//       {
//         withCredentials: true,
//         headers: {
//           origin: 'http://localhost:3031',
//         },
//       }
//     )
//     .then((res) => res.data)
//     .catch((err) => console.log(err.message));
//   return {
//     props: {
//       data: data || null,
//     },
//   };
// };

export default MyProfile;
