import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core';

export const PostListStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '0px 15px',
      marginBottom: '30px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      [theme.breakpoints.down(720)]: {
        padding: '0px 0px',
      },
    },
    linkContainer: {
      width: '95%',
      marginBottom: '20px',
    },
    cardRoot: {
      width: '100%',
      boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 4px rgb(0 0 0 / 8%)`,
    },
    media: {
      paddingTop: '56.25%', // 16:9
      height: 0,
      borderBottom: '1px solid #e7e7e7',
    },
    cardTitle: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '5px',
      '& > h2': {
        maxWidth: '80%',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
      },
    },
    thumbsContainer: {
      width: '112px',
      whiteSpace: 'nowrap',
    },
    postInfoContainer: {
      color: `rgba(0, 0, 0, 0.50)`,
      marginTop: '8px',
    },
    tagList: {
      display: 'flex',
      margin: '0 12px 12px 12px',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  })
);
