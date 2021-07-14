import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { createStyles, Theme, useTheme } from '@material-ui/core/styles';
import React, { ChangeEvent, FC, MouseEventHandler } from 'react';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import useMenuStore from '../../stores/useMenuStore';
import Footer from './Footer';
import Link from 'next/link';
import { useRouter } from 'next/router';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      // width: theme.spacing(7.5) + 1,
      width: 0,
      [theme.breakpoints.up('sm')]: {
        // width: theme.spacing(7.5) + 1,
        width: 0,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      minWidth: 0,
      // padding: theme.spacing(3),
    },
  })
);

const SideBar: FC = ({ children }) => {
  const router = useRouter();
  const classes = useStyles();
  // console.log('pathname : ', router.pathname);

  const open = useMenuStore((state) => state.open);
  const closeMenu = useMenuStore((state) => state.closeMenu);

  const theme = useTheme();

  const handleDrawerClose = async () => {
    await closeMenu();
    // console.log(open);
  };
  // console.log(open);

  const handleSup = (e: any) => {
    e.preventDefault();
    router.push('/sup');
  };

  return (
    <>
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}>
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link href="/sup" as="/sup">
              <ListItem button key={'Sup'}>
                <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                <ListItemText primary={'Sup'} />
              </ListItem>
            </Link>
            {['검색'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Front-End', 'Back-End', 'Full-Stack'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div style={{ marginTop: '10px' }}>{children}</div>

          {/* <Footer /> */}

          {/* 경로에 따라 Footer를 안보여주려면 이렇게 */}
          {/* {router.pathname !== '/blog/write' && <Footer />} */}
        </main>
      </div>
    </>
  );
};

export default SideBar;
