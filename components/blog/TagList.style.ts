import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '250px',
      minWidth: '250px',
      backgroundColor: theme.palette.background.paper,
      marginRight: '70px',
      [theme.breakpoints.down(1094)]: {
        display: 'none',
      },
    },
    title: {
      marginLeft: '15px',
      marginBottom: '8px',
    },
  })
);
