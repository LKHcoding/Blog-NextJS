import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    writerInfoContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    avatar: {
      height: '20px',
      width: '20px',
      marginRight: '4px',
    },
    loginId: {
      paddingTop: '2px',
    },
    actionButton: {
      pointerEvents: 'none',
    },
  })
);
