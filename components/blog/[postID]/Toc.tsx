import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down(1290)]: {
        // ['@media (max-width:1365px)']: {
        display: 'none',
      },
    },
    tocFont: {
      '& > span': {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontSize: '0.8rem',
      },
    },
    btnStyle: {
      '&:hover': {
        '& div span': {
          color: 'black',
          fontSize: '0.83rem',
          transition: '0.2s',
        },
      },
    },
    currentHeading: {
      '&': {
        backgroundColor: 'rgba(102, 128, 153, 0.07)',
        borderLeft: '3px solid #959ed8',
      },
      '& div span': {
        color: 'black',
        fontSize: '0.83rem',
        transition: '0.2s',
      },
    },
  })
);

interface Props {
  content: string;
}

const Toc = ({ content }: Props) => {
  // activeId는 화면 상단에 위치한 제목 element 다룰 state
  const [activeId, setActiveId] = useState('');

  // intersectionObserver를 이용해 만든 커스텀 훅으로 setState를 전달 하여
  // 화면 상단에 위치한 제목 element가 뭔지 알아낸다.
  useIntersectionObserver(setActiveId, content);

  const classes = useStyles();

  // 게시물 본문을 줄바꿈 기준으로 나누고, 제목 요소인 것만 저장
  const titles = content.split(`\n`).filter((t) => t.includes('# '));

  // 예외처리 - 제목은 문자열 시작부터 #을 써야함
  const result = titles
    .filter((str) => str[0] === '#')
    .map((item) => {
      // #의 갯수에 따라 제목의 크기가 달라지므로 갯수를 센다.
      let count = item.match(/#/g)?.length;
      if (count) {
        // 갯수에 따라 목차에 그릴때 들여쓰기 하기위해 *10을 함.
        count = count * 10;
      }

      // 제목의 내용물만 꺼내기 위해 '# '을 기준으로 나누고, 백틱과 공백을 없애주고 count와 묶어서 리턴
      return { title: item.split('# ')[1].replace(/`/g, '').trim(), count };
    });

  return (
    <div style={{ width: '200px' }} className={classes.root}>
      <List component="nav" aria-label="secondary mailbox folders">
        <Typography
          variant="h6"
          component="h6"
          style={{
            marginBottom: '3px',
            fontSize: '0.9rem',
            marginLeft: '10px',
            color: '#909090',
          }}>
          목차
        </Typography>
        <Divider />
        {/* 목차에 item이 너무 많은경우 화면 아래로 넘어갈수 있기때문에 ScrollBars를 이용하여
        스크롤을 만들어준다. */}
        <Scrollbars
          universal={true}
          autoHide
          autoHeight
          autoHeightMax="calc(100vh - 250px)"
          autoHeightMin="calc(100vh - 250px)">
          {result.map((item, idx) => {
            // count는 샾개수에 따른 들여쓰기용 변수
            if (item?.count && item.count <= 30 && item?.title) {
              return (
                <ListItemLink
                  // href에 #title을 주어서 클릭시 해당 위치로 스크롤 이동하도록 구현
                  href={`#${item.title}`}
                  key={item.title + idx}
                  style={{ padding: '0px', height: '27.91px' }}
                  className={clsx(
                    classes.btnStyle,
                    // activeId와 같은 list item만 스타일을 다르게 주어서 사용자에게 표시해준다.
                    activeId === item.title && classes.currentHeading
                  )}>
                  <ListItemText
                    // 목차에 해당 하는 title을 넣는다.
                    primary={`${item.title}`}
                    style={{
                      marginLeft: `${item.count}px`,
                      overflow: 'hidden',
                      color: '#909090',
                    }}
                    className={classes.tocFont}
                  />
                </ListItemLink>
              );
            }
          })}
        </Scrollbars>
      </List>
    </div>
  );
};

export default Toc;

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}
