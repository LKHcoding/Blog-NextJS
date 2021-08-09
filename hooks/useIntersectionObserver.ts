import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (
  // 넘겨받은 setActiveId 를 통해 화면 상단의 제목 element를 set해준다.
  setActiveId: React.Dispatch<React.SetStateAction<string>>,
  // 게시글 내용이 바뀔때를 알기 위해 content를 넘겨받는다.
  content: string
) => {
  // heading element를 담아서 사용하기 위한 ref
  const headingElementsRef = useRef<any>({});

  useEffect(() => {
    // 새로고침 없이 다른 게시물로 이동할 경우를 대비한 초기화
    headingElementsRef.current = {};

    // callback은 intersectionObserver로 관찰할 대상 비교 로직
    const callback: IntersectionObserverCallback = (headings) => {
      // 모든 제목을 reduce로 순회해서 headingElementsRef.current에 키 밸류 형태로 할당.
      headingElementsRef.current = headings.reduce((map: any, headingElement) => {
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      // 화면 상단에 보이고 있는 제목을 찾아내기 위한 로직
      const visibleHeadings: IntersectionObserverEntry[] = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];

        // isIntersecting이 true라면 visibleHeadings에 push한다.
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      // observer가 관찰하는 영역에 여러개의 제목이 있을때 가장 상단의 제목을 알아내기 위한 함수
      const getIndexFromId = (id: string) =>
        headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 1) {
        // 화면에 보이고 있는 제목이 1개라면 해당 element의 target.id를 setActiveId로 set해준다.
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        // 2개 이상이라면 sort로 더 상단에 있는 제목을 set해준다.
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id)
        );
        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    // IntersectionObserver에 callback과 옵션을 생성자로 넘겨 주고 새로 생성한다.
    const observer = new IntersectionObserver(callback, {
      // rootMargin 옵션을 통해 화면 상단에서 네비바 영역(-64px)을 빼고, 위에서부터 -40%정도 영역만 관찰한다.
      rootMargin: '-64px 0px -40% 0px',
    });

    // 제목 태그들을 다 찾아낸다.
    const headingElements = Array.from(document.querySelectorAll('h1, h2, h3'));

    // 이 요소들을 observer로 관찰한다.
    headingElements.forEach((element) => observer.observe(element));

    // 컴포넌트 언마운트시 observer의 관찰을 멈춘다.
    return () => observer.disconnect();

    // content 내용이 바뀔때를 대비하여 deps로 content를 넣어준다.
  }, [content]);
};
