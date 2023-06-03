import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      borderTop: '1px solid rgba(0, 0, 0, 0.12)',
      paddingTop: '25px',
      paddingBottom: '25px',
    },
  })
);
