import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import axios from 'axios';

const api_url = process.env.NEXT_PUBLIC_API_URL;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const postList = await axios
    .get(`${api_url}/v1/blog/all-posts-sitemap-info`, {
      withCredentials: true,
    })
    .then((res) => res.data)
    .catch((err) => err);

  interface postDataType {
    changefreq: string;
    priority: number;
    loc: string;
  }
  const fields: postDataType[] = [];

  // Add static pages
  const pages = ['/'];
  pages.map((url) => {
    fields.push({
      loc: `${api_url}${url}`,
      changefreq: 'daily',
      priority: 0.9,
    });
  });

  // Add posts data
  postList?.map(
    (post: { id: number; updatedAt: Date; User: { loginID: string } }) => {
      fields.push({
        loc: `${api_url}/blog/${post.User.loginID}/${post.id}`,
        changefreq: 'daily',
        priority: 0.9,
      });
    }
  );
  // const fields = [
  //   {
  //     loc: 'https://example.com', // Absolute url
  //     lastmod: new Date().toISOString(),
  //     // changefreq
  //     // priority
  //   },
  //   {
  //     loc: 'https://example.com/dynamic-path-2', // Absolute url
  //     lastmod: new Date().toISOString(),
  //     // changefreq
  //     // priority
  //   },
  // ];

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
// eslint-disable-next-line @typescript-eslint/no-empty-function
export default () => {};
