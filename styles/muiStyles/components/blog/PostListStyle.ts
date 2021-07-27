import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core';

export const PostListStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // marginLeft: '100px',
      padding: '0px 15px',
      marginBottom: '30px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      // justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down(720)]: {
        padding: '0px 0px',
      },
    },
    linkContainer: {
      width: '95%',
      // height: '100%',
      marginBottom: '20px',
    },
    cardRoot: {
      width: '100%',
      // padding: '100px',
      // margin: '50px',
      // maxWidth: 345,

      // marginBottom: '20px',
      boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 4px rgb(0 0 0 / 8%)`,
      // boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)`,
    },
    media: {
      // width: '100%',
      // height: '100%',
      // paddingTop: '56.25%', // 16:9
      paddingTop: '56.25%', // 16:9
      height: 0,
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
        // [theme.breakpoints.down(720)]: {
        //   // display: 'none',
        //   maxWidth: '60%',
        // },
      },
    },
    tagList: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  })
);
