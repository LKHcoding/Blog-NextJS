import {
  AppBar,
  Badge,
  ClickAwayListener,
  fade,
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
import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import { Flip, toast } from 'react-toastify';
// import { useIsFetching } from 'react-query';
import useLoadingStore from '../../stores/useLoadingStore';
import { getMyUserDataApi } from '../../utils/queryAPI';
import FullScreenDialog from '../write/FullScreenDialog';
import useMenuStore from './../../stores/useMenuStore';
import { Autocomplete } from './Autocomplete/Autocomplete';

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
        // 들어갈때
        duration: 400,
        // duration: theme.transitions.duration.shortest,
        // duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        // 튀어나올때
        duration: 650,
        // duration: theme.transitions.duration.shortest,
        // duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      // display: 'none',
      // overflow: 'hidden',
      // padding: 0,
      // width: 0,
      // margin: 0,
      // transition: theme.transitions.create(['width', 'margin', 'padding'], {
      //   easing: theme.transitions.easing.sharp,
      //   duration: theme.transitions.duration.shortest,
      //   // duration: theme.transitions.duration.enteringScreen,
      // }),
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
      // maxHeight: '15px',
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
    // sectionMobile: {
    //   display: 'flex',
    //   [theme.breakpoints.up('md')]: {
    //     display: 'none',
    //   },
    // },
  })
);

const header = () => {
  // How many queries are fetching?
  // const isFetching = useIsFetching();
  // console.log('isFetching : ', isFetching);

  // How many queries matching the posts prefix are fetching?
  //  const isFetchingPosts = useIsFetching(['posts'])

  const router = useRouter();

  const { data, refetch } = useQuery(getMyUserDataApi.key, getMyUserDataApi.apiCall);

  const classes = useStyles();

  const isLoading = useLoadingStore((state) => state.isLoading);
  const open = useMenuStore((state) => state.open);
  const openMenu = useMenuStore((state) => state.openMenu);

  const handleDrawerOpen = () => {
    openMenu();
  };

  const [dropDownOpen, setDropDownOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setDropDownOpen((prevOpen) => !prevOpen);
  };
  //

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setDropDownOpen(false);
  };

  const handleLogout = async (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setDropDownOpen(false);

    const logoutResult = await axios
      .get('/api/logout')
      .then((res) => res)
      .catch((err) => err);
    // console.log(logoutResult.status);

    if (logoutResult.status === 200) {
      toast.error(`로그아웃 완료`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });
      refetch();
    }

    // console.log(logoutResult);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setDropDownOpen(false);
    }
  }

  // return focus to the button when we transitioned from !dropDownOpen -> dropDownOpen
  const prevOpen = React.useRef(dropDownOpen);
  React.useEffect(() => {
    if (prevOpen.current === true && dropDownOpen === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = dropDownOpen;
  }, [dropDownOpen]);

  const handleWriteBtn = useCallback(() => {
    router.push(`/blog/write`);
  }, []);

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
            <Link href={`/`} as={`/`}>
              <a>
                <Typography variant="h6" noWrap className={clsx(classes.titleStyle)}>
                  Develogger
                </Typography>
              </a>
            </Link>

            {/* 서치인풋박스 시작 */}
            {/* <div className={classes.search}> */}
            {/* <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              /> */}
            {/* </div> */}
            {/* 서치인풋박스 끝 */}
            <div className={classes.algoliaSearch}>
              <Autocomplete placeholder="Search" openOnFocus={true} />
              {/* <Autocomplete placeholder="Search" openOnFocus={true} debug={true} /> */}
            </div>

            {/* 네비바 우측 아이콘 모음 시작 */}
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {data && (
                <>
                  <FullScreenDialog />

                  <IconButton
                    className={clsx(classes.largeIcon)}
                    aria-label="show 17 new notifications"
                    color="default">
                    <Badge badgeContent={17} color="secondary">
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
                color="default">
                {/* <AccountCircle /> */}
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
                disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                    }}>
                    <Paper className={clsx(classes.dropDownMenu)}>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={dropDownOpen}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown}>
                          {/* 로그인 안한 상태 */}
                          {!data && [
                            <Link href={`/login`} as={`/login`} key="logIn">
                              <a>
                                <MenuItem onClick={handleClose}>
                                  <ListItemIcon className={clsx(classes.dropDownMenuIcon)}>
                                    <VerifiedUserIcon fontSize="small" />
                                  </ListItemIcon>
                                  <Typography variant="inherit" noWrap>
                                    로그인
                                  </Typography>
                                </MenuItem>
                              </a>
                            </Link>,
                            // <Link href={`/signup`} as={`/signup`} key="signUp">
                            <Link href={`/login`} as={`/login`} key="signUp">
                              <a>
                                <MenuItem onClick={handleClose}>
                                  <ListItemIcon className={clsx(classes.dropDownMenuIcon)}>
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
                              key="profile">
                              <a>
                                <MenuItem onClick={handleClose}>
                                  <ListItemIcon className={clsx(classes.dropDownMenuIcon)}>
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
                              key="blog">
                              <a>
                                <MenuItem onClick={handleClose}>
                                  <ListItemIcon className={clsx(classes.dropDownMenuIcon)}>
                                    <LibraryBooksIcon fontSize="small" />
                                  </ListItemIcon>
                                  <Typography variant="inherit" noWrap>
                                    내 블로그
                                  </Typography>
                                </MenuItem>
                              </a>
                            </Link>,
                            <MenuItem onClick={handleLogout} key="logOut">
                              <ListItemIcon className={clsx(classes.dropDownMenuIcon)}>
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

            {/* 네비바 우측 아이콘 모음 끝 */}
          </Toolbar>
          {isLoading && <LinearProgress />}
        </AppBar>
      </div>
    </>
  );
};

export default header;
