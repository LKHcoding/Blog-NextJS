import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      '& > *': {
        margin: theme.spacing(1),
        boxShadow:
          '0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)',
        width: '100%',
        height: '100%',
        minHeight: '800px',
        maxWidth: '1400px',
      },
      '& > .MuiPaper-root': {
        [theme.breakpoints.down(1094)]: {
          margin: '100px 5px 15px 5px !important',
        },
        [theme.breakpoints.down(640)]: {
          margin: '100px 0px 15px 0px !important',
        },
      },
    },
    container: {
      display: 'flex',
      padding: '0px 20px',
      width: '100%',
      justifyContent: 'center',
      [theme.breakpoints.down(720)]: {
        padding: '0px 5px',
      },
    },
    contents: {
      display: 'flex',
      marginTop: '30px',
      width: '100%',
      maxWidth: '1200px',
      justifyContent: 'center',
      [theme.breakpoints.down(1000)]: {
        flexDirection: 'column',
      },
    },
  })
);
