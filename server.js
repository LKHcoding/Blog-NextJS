const express = require('express');
const next = require('next');
const morgan = require('morgan');
// const cookieParser = require("cookie-parser");
// const expressSession = require("express-session");
const axios = require('axios');

// 실행 환경 여부 가져오기
const dev = process.env.NODE_ENV !== 'production';

// 원래 express에서 next를 굳이 가져올 필요 없지만 next앱이기때문에 구조 맞춰주기위해서 불러옴
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const port = process.env.PORT || 3000;
  const server = express();

  server.use(morgan('dev'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
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
