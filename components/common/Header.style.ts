import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core';

const drawerWidth = 160;
export const useStyles = makeStyles((theme: Theme) =>
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
    notificationIcon: {
      height: '27px',
      width: '27px',
    },
    avatar: {
      height: '35px',
      width: '35px',
    },
  })
);
