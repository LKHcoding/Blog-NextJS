import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 80,
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
  },
  avatarImg: {
    height: '130px',
    width: '130px',
    transition: 'all 0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  cardAction: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    '& h5': {
      marginLeft: '8px',
      transition: 'all 0.2s',
      cursor: 'pointer',
    },
    '& h5:hover': {
      textDecoration: 'underline',
    },
  },
});
