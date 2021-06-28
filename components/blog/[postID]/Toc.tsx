import React from 'react';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      ['@media (max-width:1365px)']: {
        display: 'none',
      },
    },
    tocFont: {
      '& > span': {
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
  })
);

interface Props {
  content: string;
}

export const Toc = ({ content }: Props) => {
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
    <div style={{ minWidth: '170px', maxWidth: '200px' }} className={classes.root}>
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
        {result.map((item, idx) => {
          if (item?.count && item.count <= 30) {
            return (
              <ListItemLink
                href={`#${item.title}`}
                key={item.title + idx}
                style={{ padding: '0px' }}
                className={classes.btnStyle}>
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
      </List>
    </div>
  );
};

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}
