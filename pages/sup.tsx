import { Button } from '@material-ui/core';
import React, { FC, useEffect } from 'react';

interface Props {
  query: any;
  token: string;
}
const Sup = ({ query, token }: Props) => {
  // console.log('query : ', query);
  // console.log('token : ', token);
  // cookie.set('Authentication', query, {});

  // const test = async () => {
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
  //       }
  //     )
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   test();
  // }, []);

  return (
    <>
      <Button color="primary" variant="contained">
        asdf
      </Button>
    </>
  );
};

// Sup.getInitialProps = async (context: { query: any }) => {
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

Sup.getInitialProps = async (context: { query: any; req: any }) => {
  const { query, req } = context;

  return { query, token: req.cookies?.token || '' };
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

export default Sup;
