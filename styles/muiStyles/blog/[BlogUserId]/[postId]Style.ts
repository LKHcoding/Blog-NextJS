import { makeStyles, Theme, createStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',

      '& > .MuiPaper-root': {
        // margin: theme.spacing(1),
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

    commentContainer: {
      width: '100%',
      marginTop: '60px',
      display: 'flex',
      // alignItems: 'flex-end',
    },
    commentWriterAvatar: {
      paddingTop: '21px',
    },
    commentInputContainer: {
      width: '100%',
      '& label': {
        fontSize: '0.9rem',
      },
    },
    commentInput: {
      width: '100%',
      marginLeft: '10px',
      marginBottom: '3px',
    },
  })
);
