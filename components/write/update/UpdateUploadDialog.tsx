import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { DropzoneArea } from 'material-ui-dropzone';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useQuery, useQueryClient } from 'react-query';
import {
  getAllPostInfoApi,
  getMyUserDataApi,
  getOneUserPostInfoDataApi,
  getOneUserTagInfoDataApi,
  getPostInfoDataApi,
} from '../../../utils/queryAPI';
import { Flip, toast } from 'react-toastify';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiDialog-paperWidthSm': {
        maxWidth: '750px',
      },
      '& .MuiGrid-container': {
        justifyContent: 'center',
      },
    },
  })
);

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

interface Props {
  handleSave: (file: File[]) => Promise<'success' | undefined>;
  conditionSave: boolean;
  handleSaveWithOutThumbnail: () => Promise<'success' | undefined>;
  postId: number | null;
  isUpdate?: boolean;
}

const UpdateUploadDialog = ({
  handleSave,
  conditionSave,
  handleSaveWithOutThumbnail,
  postId,
  isUpdate = false,
}: Props) => {
  const queryClient = useQueryClient();

  const { data, refetch } = useQuery(getMyUserDataApi.key, getMyUserDataApi.apiCall);

  const classes = useStyles();

  const [canSave, setCanSave] = useState(false);

  const [open, setOpen] = useState(false);

  const imageFile = useRef<File[]>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = async () => {
    // console.log(imageFile.current);
    if (imageFile.current) {
      if (imageFile.current.length > 0) {
        const result = await handleSave(imageFile.current);
        if (result === 'success') {
          await queryClient.invalidateQueries(`${getOneUserTagInfoDataApi.key}-${data?.loginID}`);
          await queryClient.invalidateQueries(`${getOneUserPostInfoDataApi.key}-${data?.loginID}`);
          await queryClient.invalidateQueries(`${getAllPostInfoApi.key}`);
          await queryClient.invalidateQueries(`${getPostInfoDataApi.key}-${postId}`);

          toast.info(`????????? ?????????????????????.`, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            transition: Flip,
          });

          setOpen(false);
        }
      }
    }
  };

  const handleUploadWithOutThumbnail = async () => {
    // console.log(imageFile.current);
    const result = await handleSaveWithOutThumbnail();
    if (result === 'success') {
      await queryClient.invalidateQueries(`${getOneUserTagInfoDataApi.key}-${data?.loginID}`);
      await queryClient.invalidateQueries(`${getOneUserPostInfoDataApi.key}-${data?.loginID}`);
      await queryClient.invalidateQueries(`${getAllPostInfoApi.key}`);
      await queryClient.invalidateQueries(`${getPostInfoDataApi.key}-${postId}`);

      toast.info(`????????? ?????????????????????.`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition: Flip,
      });

      setOpen(false);
    }
  };

  return (
    <div>
      <Button
        disabled={conditionSave}
        autoFocus
        variant="outlined"
        color="inherit"
        onClick={handleClickOpen}>
        save
      </Button>
      <Dialog
        className={classes.root}
        open={open}
        // onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Thumbnail - Image
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ????????? ???????????? ???????????? ????????? ???????????? ????????? ??? ?????? ????????? ?????? ????????????? (??????:
            16:9)
          </DialogContentText>

          <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText={'Drag and drop an image here or Click!'}
            filesLimit={1}
            showFileNames={true}
            maxFileSize={5 * 1024 * 1024} // 5MB
            onChange={(files) => {
              imageFile.current = files;
              files.length === 0 ? setCanSave(false) : setCanSave(true);
            }}
            // onChange={(files) => console.log('Files:', files)}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ width: '70px' }} onClick={handleClose} color="primary">
            ??????
          </Button>

          {isUpdate && (
            <Button
              disabled={canSave}
              style={{ width: '90px' }}
              onClick={handleUploadWithOutThumbnail}
              variant="outlined"
              color="primary">
              ????????????
            </Button>
          )}
          <Button
            disabled={!canSave}
            autoFocus
            style={{ width: '70px' }}
            variant="outlined"
            onClick={handleUpload}
            color="primary">
            ??????
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateUploadDialog;
