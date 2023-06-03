import React from 'react';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import clsx from 'clsx';
import Link from 'next/link';

import useMenuStore from 'stores/useMenuStore';
import { useStyles } from './NewSideBar.style';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const NewSideBar = () => {
  const classes = useStyles();

  const open = useMenuStore((state) => state.open);
  const closeMenu = useMenuStore((state) => state.closeMenu);

  const toggleDrawer =
    (_anchor: Anchor, _open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      closeMenu();
    };

  const list = (anchor: Anchor) => (
    <nav
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link href={`/blog/LKHcoding/107`} as={`/blog/LKHcoding/107`}>
          <a>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'소개'} />
            </ListItem>
          </a>
        </Link>
      </List>
      <Divider />
    </nav>
  );

  return (
    <div>
      <Drawer
        transitionDuration={{ enter: 400, exit: 550 }}
        anchor={'left'}
        open={open}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Drawer>
    </div>
  );
};

export default NewSideBar;
