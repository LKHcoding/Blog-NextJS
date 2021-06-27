import React from 'react';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > span': {
        fontSize: '0.8rem',
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
    return { title: item.split('# ')[1].replaceAll('`', ''), count };
  });

  // console.log(result);

  return (
    <div style={{ minWidth: '170px', maxWidth: '200px' }}>
      {/* <Divider /> */}
      <List component="nav" aria-label="secondary mailbox folders">
        {result.map((item, idx) => {
          if (item?.count && item.count <= 30) {
            return (
              <ListItemLink
                href={`#${item.title}`}
                key={item.title + idx}
                style={{ padding: '0px' }}>
                <ListItemText
                  primary={`${item.title}`}
                  style={{
                    marginLeft: `${item.count}px`,
                    overflow: 'hidden',
                  }}
                  className={classes.root}
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
