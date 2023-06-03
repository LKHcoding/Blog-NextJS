import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatar: {
      marginTop: '-82px',
      height: '160px',
      width: '160px',
    },
    ownerInfoContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    ownerInfoWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: '#3C4858',
      margin: '1.75rem 0 0.875rem',
      display: 'inline-block',
      position: 'relative',
      marginTop: '18px',
      minHeight: '32px',
      fontFamily: 'Roboto Slab,Times New Roman, serif',
      fontWeight: 700,
      textDecoration: 'none',
      fontSize: ' 1.5625rem',
      lineHeight: '1.4em',
    },
    subtitle: {
      fontSize: '.75rem',
      textTransform: 'uppercase',
      fontWeight: 500,
      margin: '10px 0',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: '1.5em',
    },
    bio: {
      fontSize: '14px',
      margin: '0 0 10px',
      color: '#999',
      textAlign: 'center',
    },
  })
);
