import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingContainer: {
      width: '100%',
      height: '81vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',

      marginTop: '10px',

      '& > .MuiPaper-root': {
        boxShadow:
          '0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)',
        width: '100%',
        height: '100%',
        minWidth: 0,
        minHeight: '800px',
        maxWidth: '1400px',

        borderRadius: '10px',
        margin: '100px 30px 15px 30px',
        position: 'relative',
        [theme.breakpoints.down(720)]: {
          margin: '100px 10px 10px 10px',
        },
        [theme.breakpoints.down(470)]: {
          margin: '100px 0px 10px 0px',
        },
      },
    },

    paperHeader: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    blogNameWrapper: {
      display: 'flex',
      flexDirection: 'row',
    },
    blogName: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '& > a': {
        margin: '18px 0 0.875rem',
      },
    },
    blogTitleStyle: {
      color: '#3C4858',
      display: 'inline-block',
      position: 'relative',
      minHeight: '32px',
      fontFamily: 'Roboto Slab,Times New Roman, serif',
      fontWeight: 700,
      textDecoration: 'none',
      fontSize: ' 1.5625rem',
      lineHeight: '1.4em',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    btnList: {
      '& > button': {
        marginBottom: '15px',
      },
    },
    tagList: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      '& > *': {
        marginRight: theme.spacing(0.5),
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(0.5),
      },
    },
    leftBtnsSection: {
      position: 'absolute',
      left: '-150px',
      top: '0px',
      height: '100%',
      width: '50px',

      '& > div': {
        position: 'sticky',
        top: '150px',
      },

      [theme.breakpoints.down(1320)]: {
        left: '-125px',
      },
      [theme.breakpoints.down(1250)]: {
        left: '-100px',
      },
      [theme.breakpoints.down(1080)]: {
        display: 'none',
      },
    },
    tocSection: {
      position: 'absolute',
      right: '5%',
      top: '200px',
      height: 'calc(100% - 260px)',
      width: '200px',

      '& > div': {
        position: 'sticky',
        top: '150px',
      },

      [theme.breakpoints.down(1440)]: {
        right: '3.5%',
      },
      [theme.breakpoints.down(1400)]: {
        right: '2.5%',
      },
      [theme.breakpoints.down(1370)]: {
        right: '1.5%',
      },
    },
    avatarImg: {
      marginTop: '-82px',
      height: '160px',
      width: '160px',

      transition: 'all 0.2s',
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
    commentHeading: {
      marginTop: 60,
    },

    postBodyContainer: {
      display: 'flex',
      padding: '0px 20px',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      '& > div': {
        display: 'flex',
        marginTop: '30px',
        width: '100%',
        height: '100%',
        maxWidth: '1200px',
        justifyContent: 'center',
      },
      '& > div > div': {
        marginBottom: '80px',
        width: '100%',
        height: '100%',
        maxWidth: '760px',
        justifyContent: 'center',
        position: 'relative',
      },
    },
    postTitle: {
      overflowWrap: 'anywhere',
    },
    postSubTitle: {
      marginLeft: '3px',
    },

    contentContainer: {
      width: '100%',
      height: '100%',
      marginTop: '25px',
    },
    postBannerImage: {
      marginBottom: '25px',
      width: '100%',
    },

    thumbIcon: {
      height: '27px',
      width: '27px',
    },
  })
);
