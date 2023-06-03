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
    btnDisabledBorderColor: {
      border: '1px solid white !important',
    },
    dialogTitle: {
      cursor: 'move',
    },
    cancelButton: {
      width: '70px',
    },
    completeButton: {
      width: '70px',
    },
  })
);
