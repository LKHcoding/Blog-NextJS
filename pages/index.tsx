import AllPostCardList from './../components/index/AllPostCardList';
import { useEffect, useRef } from 'react';
const Home = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current } = ref;

    if (current !== null) {
      // console.log(ref.current?.parentNode);
      // 기본적으로 메인 페이지 영역에 marginTop이 적용되어있다.
      // (AppBar그림자 효과때문에 컨텐츠가 가려짐)
      // 현재 index페이지에는 backgroundColor가 적용되어있는데 이때문에 비는영역이있어
      // index페이지는 직접 부모를 선택해서 margin-top 0px을 적용함
      current.parentElement?.setAttribute('style', 'margin-top : 0px');
    }
  }, []);

  return (
    <>
      <div ref={ref}>
        <AllPostCardList />
      </div>
    </>
  );
};

export default Home;
