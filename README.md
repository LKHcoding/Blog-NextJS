# ENV variables

> .env variables example

```bash
# required .env file in root directory
ENV_NAME=DEVLOPMENT

# PORT number
PORT=3031

# for cookie
COOKIE_MAX_AGE=7
NEXT_PUBLIC_COOKIE_MAX_AGE=7

# url 변수
NEXT_PUBLIC_API_URL=http://localhost:3030
API_URL=http://localhost:3030
```

## Getting Started

```bash
# development mode
npm run dev
# --production mode
npm run start
```

Open [http://localhost:3030](http://localhost:3030) with your browser to see the result.

---

<br />

## 개발자를 위한 Blog Community - Develogger 🍳

> 게이머들이 새로운 게임을 배울때 공략글이나 전적 검색 사이트의 통계를 살펴 보는 것 처럼 <br />
> 개발자들의 **개발 공략 사이트**같은 커뮤니티가 되는 것을 목표로 하고 있습니다. <br /> > <br />
> 개발자들이 작업, 회고, 또는 공부한 기록들을 남길 수 있는 Blog 플랫폼을 제공하며, <br />
> 기록을 통해 현재 개발 **Trend**와 **인사이트**를 공유 할 수 있는 웹 사이트 입니다. <br />

## 현재까지 완성된 기능

### 1. Login, Logout (JWT)

> https://develogger.kro.kr/login

- Local login (회원가입 페이지는 추후 제작 예정, 기능은 모두 완성 되어 있음)
- Github Oauth Login ( 현재 Github Login을 통해 모든 기능 사용 가능 )

![image](https://user-images.githubusercontent.com/55027765/127579756-5068ad10-b334-4b4f-bb7f-35dedf7d08d2.png)

<br />

- Logout

![image](https://user-images.githubusercontent.com/55027765/127583860-75e5db8e-5ce9-4dbf-aa93-cd37f18e06cc.png)

<br />

---

### 2. 글쓰기

- 상단 메뉴바 우측 New Log 버튼을 통해 글쓰기 가능 ( Login 한 유저만 가능 )
  ![image](https://user-images.githubusercontent.com/55027765/127579983-4e0ba44d-db03-41c6-8a25-987a84d704e8.png)

<br />

- 태그 선택 및 자동 완성 기능
  ![image](https://user-images.githubusercontent.com/55027765/127580613-b024934c-e0bd-4120-8549-c820b45f78f7.png)

<br />

- 게시글 썸네일 이미지 업로드 기능( Save 버튼 클릭시 Dialog Pop-Up )
  ![image](https://user-images.githubusercontent.com/55027765/127580441-6593c58a-c26f-413e-8506-b0dea57a91bf.png)

<br />

---

### 3. 글 읽기

> https://develogger.kro.kr/blog/LKHcoding/66 - 예시

![develogger kro kr_blog_LKHcoding_66 (1)](https://user-images.githubusercontent.com/55027765/127582243-b7341573-0442-4839-b366-4b6bdc4c63eb.png)

- 좋아요, 싫어요 기능 ( 좌측 상단 Floating Button )

- TOC 기능 ( 우측 상단 목록 영역 ) -> 현재 읽고 있는 영역 표시 및 클릭시 해당 제목으로 스크롤 이동

<br />

---

### 4. 글 수정

> 자신이 작성한 게시글의 상세 페이지 -> 좌측 상단의 파란색 Floating Button 아래 수정버튼을 클릭 <br />
> -> 글쓰기와 같은 에디터 페이지가 팝업 되고 동일한 방법으로 수정 가능

<br />

---

### 5. 글 삭제

- 작성자 본인만 삭제 가능하도록 Back-end, Front-end 양쪽에서 모두 검사

![image](https://user-images.githubusercontent.com/55027765/127585407-e4057377-508a-4de0-9cb4-ca4a4995e411.png)

<br />

---

### 6. 유저별 개인 블로그 페이지

- 우측 상단 프로필 버튼 -> 내 블로그

![image](https://user-images.githubusercontent.com/55027765/127583628-7e112e25-f54a-4700-b8b9-31adafebadaf.png)

<br />

- 내가 작성한 모든 게시물을 볼 수 있는 개인 블로그 페이지

![develogger kro kr_blog_LKHcoding](https://user-images.githubusercontent.com/55027765/127584042-91468559-781d-4f4e-b974-11e033fb5488.png)

<br />

- 태그 목록 -> 특정 태그 클릭시 해당 태그를 사용한 게시글만 보여줍니다.

![image](https://user-images.githubusercontent.com/55027765/127584244-8ad09488-5080-452c-b218-5e60752cf690.png)

<br />

---

## 추가 기능 계획

- 게시글 검색 기능 ( 제목, 내용, 유저별, 태그별 선택 가능 하도록)
- 댓글, 대댓글
- 좋아요, 싫어요, 댓글 알림 기능
- Topic 기능( Topic에 따라 게시물을 추가 삭제 하여 Topic별로 게시물 관리 및 조회 지원 )
- 유저별 Follow 기능
- Follow 한 유저의 게시글을 볼 수 있는 Feed 페이지

<br />

> 데이터 시각화를 통해 개발 Trend 정보를 제공

- 개발자 포지션별 통계 차트
- 태그별 통계 차트
- 기간별 통계 차트
- 좋아요, 조회수에 따른 인기 차트 등
