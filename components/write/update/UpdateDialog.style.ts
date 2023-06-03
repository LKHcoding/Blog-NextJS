import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    button: {
      margin: theme.spacing(1),
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        margin: theme.spacing(1),
      },
    },
    exceedLength: {
      marginRight: '5px',
    },
    editorContainer: {
      display: 'flex',
      width: '100%',
    },
    textField: {
      width: '50%',
      marginBottom: '8px',
      marginTop: '10px',
      marginLeft: '10px',
      marginRight: '10px',
    },
    autoComplete: {
      width: '50%',
      marginTop: '13px',
      marginLeft: '10px',
      marginRight: '10px',
    },
  })
);
