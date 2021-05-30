/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
// const expressSession = require("express-session");
const axios = require('axios');

// 실행 환경 여부 가져오기
const dev = process.env.NODE_ENV !== 'production';

// 원래 express에서 next를 굳이 가져올 필요 없지만 next앱이기때문에 구조 맞춰주기위해서 불러옴
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const port = process.env.PORT || 3000;
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;
  const server = express();

  server.use(morgan('dev'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use(cookieParser());
  // server.use(cookieParser("!ASD!@ASd!AVZXC!@#123"));
  // server.use(
  //   expressSession({
  //     resave: false,
  //     saveUninitialized: false,
  //     secret: "!ASD!@ASd!AVZXC!@#123",
  //     cookie: {
  //       httpOnly: true,
  //       secure: false,
  //     },
  //   })
  // );

  //직접 라우팅 제어하는 방식
  // server.get("/product/:id/:name/:price", (req, res) => {
  //   const actualPage = "/product_detail";
  //   const queryParams = {
  //     id: req.params.id,
  //     name: req.params.name,
  //     price: req.params.price,
  //   };
  //   return app.render(req, res, actualPage, queryParams);
  // });

  //직접 라우팅 제어하는 방식
  server.get('/card_detail/:idx', async (req, res) => {
    const actualPage = '/card_detail';

    let result = await axios
      .get(`https://jsonplaceholder.typicode.com/users/${req.params.idx}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    const queryParams = {
      data: result,
    };
    return app.render(req, res, actualPage, queryParams);
  });

  // 프론트에서 여기를 거쳐서 백엔드로 가서 토큰을 받아오고
  // 받아온 토큰을 이용해 클라이언트에 쿠키를 만들어준다.
  server.post('/login', async (req, res) => {
    let result = await axios
      .post(`${ApiUrl}/auth/login`, req.body, { withCredentials: true })
      .then((res) => res.data)
      .catch((err) => console.log(err.message));

    let token = result.token;
    const options = {
      domain: 'localhost', // 하위 도메인을 제외한 도메인이 일치하는 경우에만 쿠키 설정. defalt: loaded
      path: '/', // 경로. 주어진 경로의 하위 디렉토리에 있는 경우에만 쿠키 설정. defalt: '/' 는 전체.
      httpOnly: true, // http에서만 쿠키활용 가능. defalt: true
      maxAge: Number(process.env.COOKIE_MAX_AGE) * 24 * 60 * 1000,
      // maxAge : 60 * 1000 = 60000 = 60초 // 쿠키가 만료되는 시간. 밀리초 단위. 0으로 설정하면 쿠키가 지워진다.
      // expires: null, // 쿠키의 만료 시간을 표준 시간으로 설정
      // signed: , // 쿠키의 서명 여부
      // secure: true, // 주소가 "https"로 시작하는 경우에만 쿠키 생성
      sameSite: 'strict', // 서로 다른 도메인간의 쿠키 전송에 대한 보안을 설정. defalt: "lax"
      // "strict" : 서로 다른 도메인에서 아예 전송 불가능. 보안성은 높으나 편의가 낮다.
      // "lax" : 서로 다른 도메인이지만 일부 예외( HTTP get method / a href / link href )에서는 전송 가능.
      // "none" : 모든 도메인에서 전송 가능
      // 좀더 자세히는 https://web.dev/samesite-cookies-explained/
    };

    res.cookie('Authentication', token, options);

    return res.status(200).json('로그인 성공');
  });

  server.get('/sup', async (req, res) => {
    const actualPage = '/sup';
    let result = await axios
      .post(
        `${ApiUrl}/auth/login`,
        {
          email: 'test4@gmail.com',
          password: 'test4',
        },
        { withCredentials: true }
      )
      .then((res) => res.data)
      .catch((err) => console.log(err.message));

    // return app.render(req, res, actualPage, { data: result });
    const queryParams = {
      data: result,
    };
    // console.log(result.token);
    let token = result.token;
    const options = {
      domain: 'localhost', // 하위 도메인을 제외한 도메인이 일치하는 경우에만 쿠키 설정. defalt: loaded
      path: '/', // 경로. 주어진 경로의 하위 디렉토리에 있는 경우에만 쿠키 설정. defalt: '/' 는 전체.
      httpOnly: true, // http에서만 쿠키활용 가능. defalt: true
      maxAge: Number(process.env.COOKIE_MAX_AGE) * 24 * 60 * 1000,
      // maxAge : 60 * 1000 = 60000 = 60초 // 쿠키가 만료되는 시간. 밀리초 단위. 0으로 설정하면 쿠키가 지워진다.
      // expires: null, // 쿠키의 만료 시간을 표준 시간으로 설정
      // signed: , // 쿠키의 서명 여부
      // secure: true, // 주소가 "https"로 시작하는 경우에만 쿠키 생성
      sameSite: 'strict', // 서로 다른 도메인간의 쿠키 전송에 대한 보안을 설정. defalt: "lax"
      // "strict" : 서로 다른 도메인에서 아예 전송 불가능. 보안성은 높으나 편의가 낮다.
      // "lax" : 서로 다른 도메인이지만 일부 예외( HTTP get method / a href / link href )에서는 전송 가능.
      // "none" : 모든 도메인에서 전송 가능
      // 좀더 자세히는 https://web.dev/samesite-cookies-explained/
    };

    res.cookie('Authentication', token, options);
    // res.send('login 성공');
    return app.render(req, res, actualPage, queryParams);
    // return app.render(req, res, actualPage);
  });

  server.get('/myprofile', async (req, res) => {
    const actualPage = '/myProfile';
    let result = await axios
      .get(`${ApiUrl}/api/users`, {
        withCredentials: true,
        headers: {
          Cookie: `Authentication=${req.cookies?.Authentication || ''}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => console.log('error : ', err.message));

    const queryParams = {
      data: result,
    };
    // console.log('req token : ', req.cookies);
    // console.log('result : ', result);

    return app.render(req, res, actualPage, queryParams);
  });

  /**
   * 넥스트가 가지고있는 페이지 프롭스를 핸들링을 하는 방식에 대한 것들의 기본 코드임
   * 라우트 명을 받아와서 넥스트에 내장되어있는 핸들러를 통해서 페이지 프롭스를 연결하는
   * 라우팅 과정을 간단하게 만들어놓은 것
   * 이 코드가 없으면 원래 넥스트가 가지고 있는 페이지 단위 라우팅이 되지 않는다.
   */
  server.get('*', (req, res) => {
    // handle은 next의 핸들러임 이렇게 하면 ssr이 가능
    return handle(req, res);
  });

  // 서버 실행중
  server.listen(port, () => {
    console.log(
      `> Next + Express Server listening at http://localhost:${port} as ${
        dev ? 'development' : process.env.NODE_ENV
      }`
    );
  });
});
