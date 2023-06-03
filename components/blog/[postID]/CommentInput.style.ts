import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    unAuthedContainer: {
      '& *': {
        cursor: 'pointer !important',
      },
    },
    root: {
      width: '100%',
      marginTop: '50px',
      marginBottom: '20px',
    },
    buttonWrapper: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  })
);
