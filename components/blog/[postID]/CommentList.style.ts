import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '100px',
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    avatarWrapper: {
      minWidth: 0,
    },
    avatar: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    userName: {
      '&:hover': {
        textDecoration: 'underline',
        cursor: 'pointer',
      },
    },
    updatedAt: {
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'end',
      marginLeft: '6px',
    },
    listItemText: {
      marginLeft: '16px',
    },
    listItemSubText: {
      whiteSpace: 'pre-line',
    },
  })
);
