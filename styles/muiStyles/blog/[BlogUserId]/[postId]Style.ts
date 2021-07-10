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
        margin: '100px 30px 10px 30px',
        position: 'relative',
        [theme.breakpoints.down(800)]: {
          margin: '100px 15px 10px 15px',
        },
        [theme.breakpoints.down(400)]: {
          margin: '100px 10px 10px 10px',
        },
      },
    },
    blogTitleStyle: {
      color: '#3C4858',
      margin: '1.75rem 0 0.875rem',
      display: 'inline-block',
      position: 'relative',
      marginTop: '18px',
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
  })
);