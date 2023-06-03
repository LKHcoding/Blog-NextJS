import {
  alpha,
  AppBar,
  Badge,
  ClickAwayListener,
  Grow,
  IconButton,
  ListItemIcon,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import axios from 'axios';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import useLoadingStore from '../../stores/useLoadingStore';
import FullScreenDialog from '../write/FullScreenDialog';
import useMenuStore from './../../stores/useMenuStore';
import { Autocomplete } from './Autocomplete/Autocomplete';
import {
  getGetUsersQueryKey,
  useGetUsers,
} from 'stores/remoteStore/endpoints/user/user';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'utils/toast';

const drawerWidth = 160;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      boxShadow:
        '0px 2px 10px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 7%), 0px 1px 3px 0px rgb(0 0 0 / 6%)',
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: 400,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: 650,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {},
    search: {
      position: 'relative',
      border: '1px solid rgba(0, 0, 0, 0.12)',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      display: 'none',
      [theme.breakpoints.up(800)]: {
        display: 'flex',
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    algoliaSearch: {
      position: 'relative',
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      display: 'none',
      [theme.breakpoints.up(750)]: {
        display: 'flex',
        marginLeft: theme.spacing(3),
        width: 'auto',
        '& .aa-Panel': {
          width: '100%',
          minWidth: '500px',
        },
      },
      [theme.breakpoints.up(960)]: {
        display: 'flex',
        marginLeft: theme.spacing(3),
        width: 'auto',
        '& .aa-Panel': {
          width: '100%',
          minWidth: '700px',
        },
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
      display: 'flex',
      marginRight: '10px',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    titleStyle: {
      cursor: 'pointer',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
    dropDownMenu: {
      marginRight: '5px',
      width: 180,
      boxShadow:
        '0px 2px 10px -1px rgb(0 0 0 / 40%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    },
    dropDownMenuIcon: {
      minWidth: 40,
    },
    largeIcon: {
      width: 50,
      height: 50,
      marginTop: '2px',
      marginLeft: '5px',
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

const header = () => {
  const router = useRouter();

  const { data } = useGetUsers();

  const queryClient = useQueryClient();
  const classes = useStyles();

  const isLoading = useLoadingStore((state) => state.isLoading);
  const open = useMenuStore((state) => state.open);
  const openMenu = useMenuStore((state) => state.openMenu);

  const handleDrawerOpen = () => {
    openMenu();
  };

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setDropDownOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setDropDownOpen(false);
  };

  const handleLogout = async (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setDropDownOpen(false);

    const logoutResult = await axios
      .get('/api/logout')
      .then((res) => res)
      .catch((err) => err);

    if (logoutResult.status === 200) {
      toast.error(`로그아웃 완료`);
      queryClient.resetQueries({
        queryKey: getGetUsersQueryKey(),
        type: 'all',
      });
    }
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setDropDownOpen(false);
    }
  }

  const prevOpen = useRef(dropDownOpen);
  useEffect(() => {
    if (prevOpen.current && !dropDownOpen) {
      anchorRef.current?.focus();
    }

    prevOpen.current = dropDownOpen;
  }, [dropDownOpen]);

  return (
    <>
      <div className={classes.root}>
        <AppBar
          color="inherit"
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Link href={`/`} as={`/`}>
              <a>
                <Typography variant="h6" noWrap className={clsx(classes.titleStyle)}>
                  Develogger
                </Typography>
              </a>
            </Link>

            <div className={classes.algoliaSearch}>
              <Autocomplete placeholder="Search" openOnFocus={true} />
            </div>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {data && (
                <>
                  <FullScreenDialog />
                  <IconButton
                    className={clsx(classes.largeIcon)}
                    aria-label="show 17 new notifications"
                    color="default"
                  >
                    <Badge
                      badgeContent={17}
                      color="secondary"
                      overlap={'rectangular'}
                    >
                      <NotificationsIcon style={{ height: '27px', width: '27px' }} />
                    </Badge>
                  </IconButton>
                </>
              )}

              <IconButton
                className={clsx(classes.largeIcon)}
                ref={anchorRef}
                aria-controls={dropDownOpen ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                edge="end"
                color="default"
              >
                <Avatar
                  color="default"
                  alt="User Profile Icon"
                  src={`${data?.avatarUrl || ''}`}
                  style={{ height: '35px', width: '35px' }}
                />
              </IconButton>

              <Popper
                open={dropDownOpen}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper className={clsx(classes.dropDownMenu)}>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={dropDownOpen}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown}
                        >
                          {/* 로그인 안한 상태 */}
                          {!data && [
                            <Link href={`/login`} as={`/login`} key="logIn">
                              <a>
                                <MenuItem onClick={handleClose}>
                                  <ListItemIcon
                                    className={clsx(classes.dropDownMenuIcon)}
                                  >
                                    <VerifiedUserIcon fontSize="small" />
                                  </ListItemIcon>
                                  <Typography variant="inherit" noWrap>
                                    로그인
                                  </Typography>
                                </MenuItem>
                              </a>
                            </Link>,
                            <Link href={`/login`} as={`/login`} key="signUp">
                              <a>
                                <MenuItem onClick={handleClose}>
                                  <ListItemIcon
                                    className={clsx(classes.dropDownMenuIcon)}
                                  >
                                    <PersonAddIcon fontSize="small" />
                                  </ListItemIcon>
                                  <Typography variant="inherit" noWrap>
                                    회원가입
                                  </Typography>
                                </MenuItem>
                              </a>
                            </Link>,
                          ]}

                          {/* 로그인 한 상태 */}
                          {data && [
                            <Link
                              href={`/profile/${data.loginID}`}
                              as={`/profile/${data.loginID}`}
                              key="profile"
                            >
                              <a>
                                <MenuItem onClick={handleClose}>
                                  <ListItemIcon
                                    className={clsx(classes.dropDownMenuIcon)}
                                  >
                                    <PersonIcon fontSize="small" />
                                  </ListItemIcon>
                                  <Typography variant="inherit" noWrap>
                                    내 프로필
                                  </Typography>
                                </MenuItem>
                              </a>
                            </Link>,
                            <Link
                              href={`/blog/${data.loginID}`}
                              as={`/blog/${data.loginID}`}
                              key="blog"
                            >
                              <a>
                                <MenuItem onClick={handleClose}>
                                  <ListItemIcon
                                    className={clsx(classes.dropDownMenuIcon)}
                                  >
                                    <LibraryBooksIcon fontSize="small" />
                                  </ListItemIcon>
                                  <Typography variant="inherit" noWrap>
                                    내 블로그
                                  </Typography>
                                </MenuItem>
                              </a>
                            </Link>,
                            <MenuItem onClick={handleLogout} key="logOut">
                              <ListItemIcon
                                className={clsx(classes.dropDownMenuIcon)}
                              >
                                <ExitToAppIcon fontSize="small" />
                              </ListItemIcon>
                              <Typography variant="inherit" noWrap>
                                로그아웃
                              </Typography>
                            </MenuItem>,
                          ]}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </Toolbar>
          {isLoading && <LinearProgress />}
        </AppBar>
      </div>
    </>
  );
};

export default header;
