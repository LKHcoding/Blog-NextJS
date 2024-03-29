// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

type Data = {
  data?: string;
  error?: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token } = req.body;

  if (token) {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('Authentication', token, {
        domain: process.env.DOMAIN, // 하위 도메인을 제외한 도메인이 일치하는 경우에만 쿠키 설정. defalt: loaded
        path: '/', // 경로. 주어진 경로의 하위 디렉토리에 있는 경우에만 쿠키 설정. defalt: '/' 는 전체.
        httpOnly: true, // http에서만 쿠키활용 가능. defalt: true
        maxAge: Number(process.env.COOKIE_MAX_AGE) * 24 * 60 * 1000,
        // maxAge : 60 * 1000 = 60000 = 60초 // 쿠키가 만료되는 시간. 밀리초 단위. 0으로 설정하면 쿠키가 지워진다.
        // expires: null, // 쿠키의 만료 시간을 표준 시간으로 설정
        // signed: , // 쿠키의 서명 여부
        // secure: process.env.NODE_ENV !== 'development', // 주소가 "https"로 시작하는 경우에만 쿠키 생성
        secure: false, // 주소가 "https"로 시작하는 경우에만 쿠키 생성
        sameSite: 'strict', // 서로 다른 도메인간의 쿠키 전송에 대한 보안을 설정. defalt: "lax"
        // "strict" : 서로 다른 도메인에서 아예 전송 불가능. 보안성은 높으나 편의가 낮다.
        // "lax" : 서로 다른 도메인이지만 일부 예외( HTTP get method / a href / link href )에서는 전송 가능.
        // "none" : 모든 도메인에서 전송 가능
        // 좀더 자세히는 https://web.dev/samesite-cookies-explained/
      })
    );
    res.status(200).json({ data: 'Github 로그인 성공' });
  } else {
    res.status(401).json({ data: 'token is not exist' });
  }
};
