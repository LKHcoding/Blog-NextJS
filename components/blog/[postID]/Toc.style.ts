import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '200px',
      [theme.breakpoints.down(1290)]: {
        display: 'none',
      },
    },
    title: {
      marginBottom: '3px',
      fontSize: '0.9rem',
      marginLeft: '10px',
      color: '#909090',
    },
    tocFont: {
      overflow: 'hidden',
      color: '#909090',
      '& > span': {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontSize: '0.8rem',
      },
    },
    btnStyle: {
      padding: '0',
      height: '27.91px',
      '&:hover': {
        '& div span': {
          color: 'black',
          fontSize: '0.83rem',
          transition: '0.2s',
        },
      },
    },
    currentHeading: {
      '&': {
        backgroundColor: 'rgba(102, 128, 153, 0.07)',
        borderLeft: '3px solid #959ed8',
      },
      '& div span': {
        color: 'black',
        fontSize: '0.83rem',
        transition: '0.2s',
      },
    },
  })
);
