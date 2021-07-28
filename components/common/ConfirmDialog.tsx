import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogTitle: string;
  dialogBody: string;
  cancelBtnTitle?: string;
  confirmBtnTitle?: string;
  callbackConfirm: () => Promise<boolean>;
}

const ConfirmDialog: FC<Props> = ({
  deleteDialogOpen: open,
  setDeleteDialogOpen: setOpen,
  dialogTitle,
  dialogBody,
  cancelBtnTitle = '취소',
  confirmBtnTitle = '확인',
  callbackConfirm,
}) => {
  // const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    const result = await callbackConfirm();
    if (result === true) {
      setOpen(false);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{`${dialogTitle}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{`${dialogBody}`}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {`${cancelBtnTitle}`}
          </Button>
          <Button onClick={handleClose} color="primary" variant="outlined" autoFocus>
            {`${confirmBtnTitle}`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
