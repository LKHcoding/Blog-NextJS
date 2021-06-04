// /* eslint-disable @typescript-eslint/no-var-requires */
// // import axios from 'axios';
// const axios = require('axios');

// module.exports.getMyUserDataApi = {
//   key: 'getMyUserData',
//   apiCall: async (Authentication) => {
//     return await axios
//       .get(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
//         typeof Authentication === 'string'
//           ? {
//               withCredentials: true,
//               headers: {
//                 Cookie: `Authentication=${Authentication || ''}`,
//               },
//             }
//           : {
//               withCredentials: true,
//             }
//       )
//       .then((response) => response.data)
//       .catch((err) => {
//         console.log(err);
//       });
//   },
// };
