import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
      padding: '25px 35px',
      backgroundColor: '#f6f6f6',

      [theme.breakpoints.down(1280)]: {
        padding: '25px 15px',
      },
    },
    cardItem: {
      margin: '5px 0px',
    },
    loading: {
      width: '100%',
      height: '81vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);
