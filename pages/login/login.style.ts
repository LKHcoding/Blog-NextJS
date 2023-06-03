import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    width: '100%',
    height: '81vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inaccessibleContainer: {
    width: '100%',
    minHeight: '500px',
    height: '85vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2rem',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '120px',
    minHeight: '500px',
    height: '80vh',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  githubLoginButton: {
    margin: theme.spacing(0, 0, 2),
  },
  githubLoginText: {
    marginLeft: '5px',
  },
}));
