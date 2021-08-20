// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

const Sitemap = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const postList = await axios
      .get(`${process.env.API_URL}/v1/blog/all-posts-sitemap`, {
        withCredentials: true,
      })
      .then((res) => res)
      .catch((err) => err);

    interface postDataType {
      url: string;
      changefreq: string;
      priority: number;
    }
    const links: postDataType[] = [];

    // Add static pages
    const pages = ['/'];
    pages.map((url) => {
      links.push({
        url,
        changefreq: 'daily',
        priority: 0.9,
      });
    });

    // Add posts data
    postList.data?.map((post: { id: number; updatedAt: Date; User: { loginID: string } }) => {
      links.push({
        url: `/blog/${post.User.loginID}/${post.id}`,
        changefreq: 'daily',
        priority: 0.9,
      });
    });

    const smStream = new SitemapStream({ hostname: `https://${req.headers.host}` });

    res.writeHead(200, {
      'Content-Type': 'application/xml',
    });

    const xmlString = await streamToPromise(Readable.from(links).pipe(smStream)).then((data) =>
      data.toString()
    );

    res.end(xmlString);
  } catch (e) {
    console.log(e);
    res.send(JSON.stringify(e));
  }
};

export default Sitemap;
