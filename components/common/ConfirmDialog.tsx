import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import useInput from '../../hooks/useInput';
import { Typography } from '@material-ui/core';

interface Props {
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogTitle: string;
  dialogBody: string;
  cancelBtnTitle?: string;
  confirmBtnTitle?: string;
  callbackConfirm: () => Promise<boolean>;
  postTitle: string;
}

const ConfirmDialog: FC<Props> = ({
  deleteDialogOpen: open,
  setDeleteDialogOpen: setOpen,
  dialogTitle,
  dialogBody,
  cancelBtnTitle = '취소',
  confirmBtnTitle = '확인',
  callbackConfirm,
  postTitle,
}) => {
  // const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    const result = await callbackConfirm();
    if (result === true) {
      setOpen(false);
    }
  };

  const [inputTitle, onChangeInputTitle, setInputTitle] = useInput('');

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
          {/* <DialogContentText id="alert-dialog-description">{`${postTitle}`}</DialogContentText> */}
          <Typography gutterBottom variant="body1">{`Title: ${postTitle}`}</Typography>
          <TextField
            style={{ marginTop: '5px' }}
            // focused
            fullWidth
            error={inputTitle !== '' && inputTitle !== postTitle}
            size="small"
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={inputTitle}
            onChange={onChangeInputTitle}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {`${cancelBtnTitle}`}
          </Button>
          <Button
            onClick={handleConfirm}
            color="primary"
            variant="outlined"
            disabled={inputTitle !== postTitle}>
            {`${confirmBtnTitle}`}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
