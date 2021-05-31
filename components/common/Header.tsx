import { AppBar, Badge, fade, IconButton, InputBase, Toolbar, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useMenuStore from './../../stores/useMenuStore';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { AccountCircle } from '@material-ui/icons';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useRouter } from 'next/router';
import Link from 'next/link';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },

    search: {
      position: 'relative',
      border: '1px solid rgba(0, 0, 0, 0.12)',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    grow: {
      flexGrow: 1,
    },
    sectionDesktop: {
      // display: 'none',
      display: 'flex',

      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    titleStyle: {
      cursor: 'pointer',
    },
    // sectionMobile: {
    //   display: 'flex',
    //   [theme.breakpoints.up('md')]: {
    //     display: 'none',
    //   },
    // },
  })
);

const header = () => {
  const classes = useStyles();
  const router = useRouter();

  const open = useMenuStore((state) => state.open);
  const openMenu = useMenuStore((state) => state.openMenu);

  const handleDrawerOpen = () => {
    openMenu();
  };

  const handleGoIndex = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <>
      {/* div에 flex줘야함 */}
      <div className={classes.root}>
        <AppBar
          color="inherit"
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}>
              <MenuIcon />
            </IconButton>
            <Link href="/">
              <Typography
                variant="h6"
                noWrap
                // onClick={handleGoIndex}
                className={clsx(classes.titleStyle)}>
                Blog
              </Typography>
            </Link>

            {/* 서치인풋박스 시작 */}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            {/* 서치인풋박스 끝 */}

            {/* 네비바 우측 아이콘 모음 시작 */}
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                // aria-controls={menuId}
                aria-haspopup="true"
                // onClick={handleProfileMenuOpen}
                color="inherit">
                <AccountCircle />
              </IconButton>
            </div>

            {/* 네비바 우측 아이콘 모음 끝 */}
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default header;
