import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      height: '81vh',

      justifyContent: 'center',
      alignItems: 'center',
    },
    backdrop: {
      zIndex: theme.zIndex.modal + 1,
      color: '#fff',
    },
  })
);
