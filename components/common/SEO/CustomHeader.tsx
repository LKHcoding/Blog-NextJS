import Head from 'next/head';
import React, { FC } from 'react';

type CustomHeaderProps = {
  //사이트 제목
  title?: string;

  // 사이트 설명
  description?: string;

  // 사이트 키워드 - string[]형태로 넣어주면 콤마 붙여서 메타태그로 작성됨
  keywords?: string[];

  // 사이트명
  author?: string;

  // 대표 URL
  canonical?: string;

  // 오픈그래프 이미지 url
  ogImageURL?: string;

  // 트위터 오픈그래프 이미지 url
  twitterImageURL?: string;
};

const CustomHeader: FC<CustomHeaderProps> = ({
  title = 'Develogger',
  description = '개발자를 위한 블로그 커뮤니티. 디벨로거는 개발 트렌드 데이터와 블로그 서비스를 제공합니다.',
  keywords = ['Develogger', '디벨로거', '디밸로거', '개발블로그', '블로그'],
  author = 'Develogger',
  canonical = 'https://develogger.kro.kr',
  ogImageURL = 'https://develogger.kro.kr/uploads/Orange%20and%20White%20Modern%20Simple%20Technology%20YouTube%20Thumbnail1627482442149.png',
  twitterImageURL = 'https://develogger.kro.kr/uploads/Orange%20and%20White%20Modern%20Simple%20Technology%20YouTube%20Thumbnail1627482442149.png',
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(',')} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content="index, follow" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={author} />
      <meta property="og:image" content={ogImageURL} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="twitter:image" content={twitterImageURL} />
    </Head>
  );
};

export default CustomHeader;
