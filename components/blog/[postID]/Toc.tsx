import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import clsx from 'clsx';
import { Scrollbars } from 'react-custom-scrollbars';

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
  const [activeId, setActiveId] = useState('');
  useIntersectionObserver(setActiveId);

  const classes = useStyles();

  const titles = content.split(`\n`).filter((t) => t[0] === '#');

  const result = titles.map((item) => {
    let count = item.match(/#/g)?.length;
    if (count) {
      count = count * 10;
    }
    return { title: item.split('# ')[1].replace(/`/g, ''), count };
  });

  // console.log(result);

  return (
    <div style={{ width: '200px' }} className={classes.root}>
      {/* <Divider /> */}
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
        <Scrollbars universal={true} autoHide autoHeight autoHeightMax="calc(100vh - 250px)">
          {result.map((item, idx) => {
            if (item?.count && item.count <= 30) {
              return (
                <ListItemLink
                  href={`#${item.title}`}
                  key={item.title + idx}
                  style={{ padding: '0px' }}
                  className={clsx(
                    classes.btnStyle,
                    activeId === item.title && classes.currentHeading
                  )}>
                  <ListItemText
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
