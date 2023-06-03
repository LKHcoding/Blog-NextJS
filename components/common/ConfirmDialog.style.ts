import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      cursor: 'move',
    },
    input: {
      marginTop: '5px',
    },
  })
);
