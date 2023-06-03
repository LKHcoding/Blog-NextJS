import React, { useState } from 'react';

import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import clsx from 'clsx';
import { Scrollbars } from 'react-custom-scrollbars';

import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import { useStyles } from './Toc.style';

type TocProps = {
  content: string;
};

const Toc = ({ content }: TocProps) => {
  const classes = useStyles();

  // NOTE: 화면 상단에 위치한 제목 element 다룰 state
  const [activeId, setActiveId] = useState('');

  useIntersectionObserver(setActiveId, content);

  const titles = content.split(`\n`).filter((t) => t.includes('# '));

  const result = titles
    .filter((str) => str[0] === '#')
    .map((item) => {
      // NOTE: #의 갯수에 따라 제목의 depth 달라지므로 갯수를 센다.
      let indentCount = item.match(/#/g)?.length;
      if (indentCount) {
        indentCount = indentCount * 10;
      }
      return { title: item.split('# ')[1].replace(/`/g, '').trim(), indentCount };
    });

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="secondary mailbox folders">
        <Typography variant="h6" component="h6" className={classes.title}>
          목차
        </Typography>
        <Divider />

        <Scrollbars
          universal={true}
          autoHide
          autoHeight
          autoHeightMax="calc(100vh - 250px)"
          autoHeightMin="calc(100vh - 250px)"
        >
          {result.map((item, idx) => {
            if (item?.indentCount && item.indentCount <= 30 && item?.title) {
              return (
                <ListItemLink
                  href={`#${item.title}`}
                  key={item.title + idx}
                  className={clsx(
                    classes.btnStyle,
                    activeId === item.title && classes.currentHeading
                  )}
                >
                  <ListItemText
                    primary={`${item.title}`}
                    style={{ marginLeft: `${item.indentCount}px` }}
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
