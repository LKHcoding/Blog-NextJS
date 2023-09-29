import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    textFieldCover: {
      position: 'absolute',
      top: '50px',
      right: 0,
      bottom: '53px',
      left: 0,
      cursor: 'pointer',
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
