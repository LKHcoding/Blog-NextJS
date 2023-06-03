import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      '& .MuiDialog-paperWidthSm': {
        maxWidth: '750px',
      },
      '& .MuiGrid-container': {
        justifyContent: 'center',
      },
    },
    dialogTitle: {
      cursor: 'move',
    },
    cancelButton: {
      width: '70px',
    },
    noChangeButton: {
      width: '90px',
    },
    completeButton: {
      width: '70px',
    },
  })
);
